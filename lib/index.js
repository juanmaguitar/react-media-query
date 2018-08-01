'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaQueryFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _helpers = require('./helpers');

var _breakpoints = require('./breakpoints.json');

var _breakpoints2 = _interopRequireDefault(_breakpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const MediaQueryFactory = BREAKPOINTS => props => {
//   return (
//     <ContainerQuery breakpoints={BREAKPOINTS} {...props} >
//       { props.children }
//     </ContainerQuery>
//   )
// }

var MediaQueryFactory = function MediaQueryFactory(BREAKPOINTS) {
  return function (_Component) {
    _inherits(MediaQuery, _Component);

    function MediaQuery() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, MediaQuery);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MediaQuery.__proto__ || Object.getPrototypeOf(MediaQuery)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        params: {}
      }, _this.containerResizeObserver = null, _this.matchQueries = (0, _helpers.matchQueries)(BREAKPOINTS), _this.handleResize = function (e) {
        var width = e.target.outerWidth;
        var params = _this.state.params;

        var result = _this.matchQueries(width);
        if (!(0, _shallowequal2.default)(result, params)) _this.setState({ params: result });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MediaQuery, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var viewport = this.props.viewport;

        var container = _reactDom2.default.findDOMNode(this);

        var initialWidth = void 0;

        if (viewport) {
          window.addEventListener('resize', this.handleResize);
          initialWidth = window.outerWidth;
        } else {
          this.containerResizeObserver = new _resizeObserverPolyfill2.default(function (entries) {
            var target = entries[0].target;
            var width = (0, _helpers.getWidth)(target);
            var params = _this2.state.params;

            var result = _this2.matchQueries(width);
            if (!(0, _shallowequal2.default)(result, params)) _this2.setState({ params: result });
          });
          this.containerResizeObserver.observe(container);
          initialWidth = (0, _helpers.getWidth)(container);
        }

        var result = (0, _helpers.matchQueries)(initialWidth);
        this.setState({ params: result });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.containerResizeObserver.disconnect();
        this.containerResizeObserver = null;
        window.removeEventListener('resize', this.handleResize);
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children(this.state.params);
      }
    }]);

    return MediaQuery;
  }(_react.Component);
};

var MediaQuery = MediaQueryFactory(_breakpoints2.default);

exports.default = MediaQuery;
exports.MediaQueryFactory = MediaQueryFactory;