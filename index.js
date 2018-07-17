import React from 'react';
import {ContainerQuery} from 'react-container-query';

const BREAKPOINTS = {
  xs: '480',
  s: '600',
  m: '840',
  l: '960',
  xl: '1280',
  xxl: '1440'
}

const getQueryObject = BREAKPOINTS => 
  Object.entries(BREAKPOINTS).reduce( (query, pairValues, index, entries) => {
    const sizeResponsive = pairValues[0].toUpperCase()
    const breakpointCurrent = +pairValues[1]

    query[sizeResponsive] = {
      minWidth: breakpointCurrent
    }
    if (entries[index+1]) {
      const breakpointNext = +entries[index+1][1]
      query[sizeResponsive].maxWidth = breakpointNext
    }

    return query
  },{})

const MediaQueryFactory = BREAKPOINTS => props => {
  const query = getQueryObject(BREAKPOINTS)
  return (
    <ContainerQuery query={query}>
      { props.children }
    </ContainerQuery>
  )
}

const MediaQuery = MediaQueryFactory(BREAKPOINTS)

export default MediaQuery
export { MediaQueryFactory }
