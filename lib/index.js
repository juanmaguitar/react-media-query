'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaQueryFactory = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
  return Object.entries(BREAKPOINTS).reduce(function (query, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        sizeResponsive = _ref2[0],
        breakpointCurrent = _ref2[1];

    query[sizeResponsive.toUpperCase()] = {
      minWidth: breakpointCurrent
    };
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
