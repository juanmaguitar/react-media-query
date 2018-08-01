import React from 'react';
import ReactDOM from "react-dom"
import ResizeObserver from 'resize-observer-polyfill';  
import shallowEqual from 'shallowequal'

import {getWidth, matchQueries} from './helpers'


import BREAKPOINTS from './breakpoints.json'

// const MediaQueryFactory = BREAKPOINTS => props => {
//   return (
//     <ContainerQuery breakpoints={BREAKPOINTS} {...props} >
//       { props.children }
//     </ContainerQuery>
//   )
// }

const MediaQueryFactory = BREAKPOINTS => 
  class MediaQuery extends Component {
    state = {
      params
    }
    containerResizeObserver = null
    matchQueries = matchQueries(BREAKPOINTS)

    componentDidMount() {
      const { viewport } = this.props
      const { params } = this.state
      const container = ReactDOM.findDOMNode(this)

      let initialWidth
      
      if (viewport) {
        window.addEventListener('resize', this.handleResize)
        initialWidth = window.outerWidth
      }
      else {
        this.containerResizeObserver = new ResizeObserver( ([ target ]) => {
          const width = getWidth(target)
          const result = matchQueries(width)
          if (!shallowEqual(result, params)) this.setState({ params: result })
        });
        this.containerResizeObserver.observe(container);
        initialWidth = getWidth(container)
      }

      const result = matchQueries(initialWidth)
      this.setState({ params: result })
      
    }

    componentWillUnmount() {
      this.containerResizeObserver.disconnect();
      this.containerResizeObserver = null;
      window.removeEventListener('resize', this.handleResize)
    }

    handleResize = e => {
      const { outerWidth: width } = e.target
      const result = matchQueries(width);
      if (!shallowEqual(result, params)) this.setState({ params: result })
    }

    render() {
      return this.props.children(this.state.params);
    }

  }

const MediaQuery = MediaQueryFactory(BREAKPOINTS)

export default MediaQuery
export { MediaQueryFactory }
