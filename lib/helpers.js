'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var getNumber = function getNumber(str) {
  var parseResults = /^([0-9\.]+)px$/.exec(str);
  return parseResults ? parseFloat(parseResults[1]) : 0;
};

var getWidth = exports.getWidth = function getWidth(element) {
  return getNumber(window.getComputedStyle(element)['width']);
};

var matchQueries = exports.matchQueries = function matchQueries(BREAKPOINTS) {
  return function (width) {
    return Object.entries(BREAKPOINTS).reduce(function (query, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          size = _ref2[0],
          breakpoint = _ref2[1];

      query[size.toUpperCase()] = width >= breakpoint;
      return query;
    }, {});
  };
};