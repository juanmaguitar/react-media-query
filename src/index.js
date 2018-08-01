import React, { Component } from 'react';
import ReactDOM from "react-dom"
import ResizeObserver from 'resize-observer-polyfill';  
import shallowEqual from 'shallowequal'

import {getWidth, matchQueries} from './helpers'

import BREAKPOINTS from './breakpoints.json'

const MediaQueryFactory = BREAKPOINTS => 
  class MediaQuery extends Component {
    state = {
      params: {}
    }
    containerResizeObserver = null
    matchQueries = matchQueries(BREAKPOINTS)

    componentDidMount() {
      const { viewport } = this.props
      const container = ReactDOM.findDOMNode(this)
      let initialWidth = 0
      
      if (viewport) {
        window.addEventListener('resize', this.handleWindowResize)
        initialWidth = window.outerWidth
      }
      else {
        this.containerResizeObserver = new ResizeObserver(this.handleContainerResize)
        this.containerResizeObserver.observe(container);
        initialWidth = getWidth(container)
      }

      const result = this.matchQueries(initialWidth)
      this.setState({ params: result })
      
    }

    componentWillUnmount() {
      this.containerResizeObserver.disconnect();
      this.containerResizeObserver = null;
      window.removeEventListener('resize', this.handleResize)
    }

    handleWindowResize = e => {
      const { outerWidth: width } = e.target
      const { params } = this.state
      const result = this.matchQueries(width);
      if (!shallowEqual(result, params)) this.setState({ params: result })
    }

    handleContainerResize = entries => {
      const target = entries[0].target
      const width = getWidth(target)
      const { params } = this.state
      const result = this.matchQueries(width)
      if (!shallowEqual(result, params)) this.setState({ params: result })
    }

    render() {
      return this.props.children(this.state.params);
    }

  }

const MediaQuery = MediaQueryFactory(BREAKPOINTS)

export default MediaQuery
export { MediaQueryFactory }
