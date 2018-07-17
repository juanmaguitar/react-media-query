'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaQueryFactory = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactContainerQuery = require('react-container-query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BREAKPOINTS = {
  xs: '480',
  s: '600',
  m: '840',
  l: '960',
  xl: '1280',
  xxl: '1440'
};

var getQueryObject = function getQueryObject(BREAKPOINTS) {
  return Object.entries(BREAKPOINTS).reduce(function (query, pairValues, index, entries) {
    var sizeResponsive = pairValues[0].toUpperCase();
    var breakpointCurrent = +pairValues[1];

    query[sizeResponsive] = {
      minWidth: breakpointCurrent
    };
    if (entries[index + 1]) {
      var breakpointNext = +entries[index + 1][1];
      query[sizeResponsive].maxWidth = breakpointNext;
    }

    return query;
  }, {});
};

var MediaQueryFactory = function MediaQueryFactory(BREAKPOINTS) {
  return function (props) {
    var query = getQueryObject(BREAKPOINTS);
    return _react2.default.createElement(
      _reactContainerQuery.ContainerQuery,
      { query: query },
      props.children
    );
  };
};

var MediaQuery = MediaQueryFactory(BREAKPOINTS);

exports.default = MediaQuery;
exports.MediaQueryFactory = MediaQueryFactory;
