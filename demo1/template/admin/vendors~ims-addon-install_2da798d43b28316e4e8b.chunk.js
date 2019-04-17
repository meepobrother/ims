(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~ims-addon-install"],{

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.jsx":
/*!**************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.jsx ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var antd_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'antd'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var index_scss_1 = __webpack_require__(/*! ./index.scss */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss");

var ims_util_1 = __importDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'ims-util'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).call(this, props));
    _this.state = {
      loading: false,
      username: 'adminer',
      password: '',
      passwordStatus: '',
      repassword: '',
      repasswordStatus: '',
      usernameStatus: ''
    };
    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var nextBtnProps = {
        type: "primary",
        onClick: function onClick() {
          return _this2.next();
        }
      };
      var prevBtnProps = {
        onClick: function onClick() {
          return _this2.props.prev();
        }
      };
      return React.createElement(antd_1.Form, {
        className: index_scss_1.cx({
          imsBind: true
        }),
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        }
      }, React.createElement(antd_1.Form.Item, {
        hasFeedback: true,
        required: true,
        validateStatus: this.state.usernameStatus,
        label: "\u8D26\u6237\u540D"
      }, React.createElement(antd_1.Input, {
        onChange: function onChange(e) {
          return _this2.username(e.target.value);
        },
        value: this.state.username,
        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D"
      })), React.createElement(antd_1.Form.Item, {
        hasFeedback: true,
        required: true,
        validateStatus: this.state.passwordStatus,
        help: '密码长度至少6位',
        label: "\u5BC6\u7801"
      }, React.createElement(antd_1.Input, {
        type: "password",
        onChange: function onChange(e) {
          return _this2.password(e.target.value);
        },
        placeholder: "\u5BC6\u7801"
      })), React.createElement(antd_1.Form.Item, {
        hasFeedback: true,
        required: true,
        validateStatus: this.state.repasswordStatus,
        label: "\u786E\u8BA4\u5BC6\u7801"
      }, React.createElement(antd_1.Input, {
        type: "password",
        onChange: function onChange(e) {
          return _this2.rePassword(e.target.value);
        },
        placeholder: "\u786E\u8BA4\u5BC6\u7801"
      })), React.createElement(antd_1.Form.Item, {
        wrapperCol: {
          span: 12,
          offset: 8
        }
      }, React.createElement("div", {
        className: index_scss_1.cx({
          footerBar: true
        })
      }, React.createElement(antd_1.Button, prevBtnProps, "\u4E0A\u4E00\u6B65"), React.createElement(antd_1.Button, nextBtnProps, "\u4E0B\u4E00\u6B65"))));
    }
  }, {
    key: "username",
    value: function username(val) {
      if (val.length > 0) {
        this.setState({
          username: val,
          usernameStatus: 'success'
        });
      } else {
        this.setState({
          username: val,
          usernameStatus: 'error'
        });
      }
    }
  }, {
    key: "next",
    value: function next() {
      var _this3 = this;

      if (this.state.username.length > 0) {
        if (this.state.password.length > 0) {
          if (this.state.password === this.state.password) {
            ims_util_1["default"].http.post('/ims-install/setUser', {
              username: this.state.username,
              password: this.state.password
            }).then(function (res) {
              if (res.data.code === -1) {
                antd_1.message.error("".concat(res.data.message));
              } else {
                _this3.props.next();
              }
            });
          }
        } else {
          this.setState({
            passwordStatus: 'error'
          });
        }
      } else {
        this.setState({
          usernameStatus: 'error'
        });
      }
    }
  }, {
    key: "password",
    value: function password(val) {
      if (val.length > 6) {
        this.setState({
          password: val,
          passwordStatus: 'success'
        });
      } else {
        this.setState({
          password: val,
          passwordStatus: 'error'
        });
      }
    }
  }, {
    key: "rePassword",
    value: function rePassword(val) {
      if (val === this.state.password) {
        this.setState({
          repassword: val,
          repasswordStatus: 'success'
        });
      } else {
        this.setState({
          repassword: val,
          repasswordStatus: 'error'
        });
      }
    }
  }]);

  return Index;
}(React.Component);

Index.defaultProps = {
  mobile: '',
  code: ''
};
exports["default"] = Index;

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss":
/*!***************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var style = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./index.scss */ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss");
    var classNames = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/index.js */ "../node_modules/_classnames@2.2.6@classnames/index.js");
    var classNamesBind = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/bind.js */ "../node_modules/_classnames@2.2.6@classnames/bind.js");
    var cx = classNamesBind.bind(style);

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.style = style
    exports.classNames = exports.cn = classNames;
    exports.default = exports.classNamesBind = exports.cx = cx;
  

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.jsx":
/*!****************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.jsx ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var antd_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'antd'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var index_scss_1 = __webpack_require__(/*! ./index.scss */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss");

var ims_util_1 = __importDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'ims-util'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

var Result_1 = __importDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'ant-design-pro/lib/Result'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).apply(this, arguments));
    _this.state = {
      installing: true,
      loading: false,
      button: '重新启动',
      total: 0,
      link: ''
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      ims_util_1["default"].ws.on('installSuccess', function () {
        _this2.setState({
          installing: false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: index_scss_1.cx({
          imsFinish: true
        })
      }, React.createElement(Result_1["default"], {
        title: "\u5B89\u88C5\u6210\u529F",
        type: "success",
        description: React.createElement("div", null, "\u7CFB\u7EDF\u5B89\u88C5\u6210\u529F\uFF0C\u9009\u62E9\u7CFB\u7EDF\u63D2\u4EF6!"),
        extra: React.createElement("div", {
          className: "addon_list"
        }, React.createElement("div", {
          className: "addon"
        }, React.createElement(antd_1.Icon, {
          className: "icon",
          title: "\u7CFB\u7EDF\u6838\u5FC3",
          type: "setting"
        }), React.createElement("div", {
          className: "title"
        }, "\u7CFB\u7EDF\u6838\u5FC3")), React.createElement("div", {
          className: "addon"
        }, React.createElement(antd_1.Icon, {
          className: "icon",
          title: "\u5E94\u7528\u5546\u5E97",
          type: "appstore"
        }), React.createElement("div", {
          className: "title"
        }, "\u5E94\u7528\u5546\u5E97")), React.createElement("div", {
          className: "addon"
        }, React.createElement(antd_1.Icon, {
          className: "icon",
          title: "\u7528\u6237\u7BA1\u7406",
          type: "user"
        }), React.createElement("div", {
          className: "title"
        }, "\u7528\u6237\u7BA1\u7406")), React.createElement("div", {
          className: "addon"
        }, React.createElement(antd_1.Icon, {
          className: "icon",
          title: "\u4E91\u670D\u52A1",
          type: "cloud"
        }), React.createElement("div", {
          className: "title"
        }, "\u4E91\u670D\u52A1")), React.createElement("div", {
          className: "addon"
        }, React.createElement(antd_1.Icon, {
          className: "icon",
          title: "\u8054\u76DF\u94FE",
          type: "share-alt"
        }), React.createElement("div", {
          className: "title"
        }, "\u8054\u76DF\u94FE"))),
        actions: this.renderButton()
      }));
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      var _this3 = this;

      if (!!this.state.link && this.state.link.length > 0) {
        var props = {
          onClick: function onClick() {
            return window.location.href = "".concat(_this3.state.link);
          },
          type: "primary"
        };
        return React.createElement(antd_1.Button, props, this.state.button);
      } else {
        var _props = {
          type: "primary",
          loading: this.state.loading,
          onClick: function onClick(e) {
            return _this3.install();
          }
        };
        return React.createElement(antd_1.Button, _props, this.state.button, " ", this.state.total > 0 ? "(".concat(this.state.total, ")") : '');
      }
    }
  }, {
    key: "install",
    value: function install() {
      var _this4 = this;

      ims_util_1["default"].http.post('/ims-install/restart');
      this.setState({
        loading: true,
        total: 0,
        button: '重新启动中..'
      });
      var pid = setInterval(function () {
        _this4.setState({
          total: _this4.state.total + 1
        });
      }, 1000);
      setTimeout(function () {
        return request();
      }, 1000);
      var that = this;

      function request() {
        ims_util_1["default"].http.get('/').then(function (res) {
          if (res.status === 200) {
            clearInterval(pid);
            setTimeout(function () {
              that.setState({
                total: 0,
                button: '进入后台',
                loading: false,
                link: '/login'
              });
            }, 2000);
          }
        })["catch"](function (e) {
          if (that.state.loading) {
            setTimeout(function () {
              request();
            }, 1000);
          }
        });
      }
    }
  }]);

  return Index;
}(React.Component);

exports["default"] = Index;

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss":
/*!*****************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var style = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./index.scss */ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss");
    var classNames = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/index.js */ "../node_modules/_classnames@2.2.6@classnames/index.js");
    var classNamesBind = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/bind.js */ "../node_modules/_classnames@2.2.6@classnames/bind.js");
    var cx = classNamesBind.bind(style);

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.style = style
    exports.classNames = exports.cn = classNames;
    exports.default = exports.classNamesBind = exports.cx = cx;
  

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.jsx":
/*!**************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.jsx ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var antd_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'antd'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var index_scss_1 = __webpack_require__(/*! ./index.scss */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss");

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).apply(this, arguments));
    _this.state = {
      agree: false,
      info: "\n        <h2 style=\"text-align:center;\">IMS\u7CFB\u7EDF\u6700\u7EC8\u7528\u6237\u8BB8\u53EF\u534F\u8BAE</h2>\n        <p class=\"date\">2019\u5E744\u67085\u65E5</p>\n        <p>\u8BF7\u52A1\u5FC5\u4ED4\u7EC6\u9605\u8BFB\u548C\u7406\u89E3\u6B64IMS\u7CFB\u7EDF\u6700\u7EC8\u7528\u6237\u8BB8\u53EF\u534F\u8BAE\uFF08\u201C\u672C\u300A\u534F\u8BAE\u300B\u201D\uFF09\u4E2D\u89C4\u5B9A\u7684\u6240\u6709\u6743\u5229\u548C\u9650\u5236\u3002</p>\n        <p><strong>\u5728\u5B89\u88C5\u672C\u201C\u7CFB\u7EDF\u201D\u65F6\uFF0C\u60A8\u9700\u8981\u4ED4\u7EC6\u9605\u8BFB\u5E76\u51B3\u5B9A\u63A5\u53D7\u6216\u4E0D\u63A5\u53D7\u672C\u300A\u534F\u8BAE\u300B\u7684\u6761\u6B3E\u3002\u9664\u975E\u6216\u76F4\u81F3\u60A8\u63A5\u53D7\u672C\u300A\u534F\u8BAE\u300B\u7684\u5168\u90E8\u6761\u6B3E\uFF0C\u5426\u5219\u60A8\u4E0D\u5F97\u5C06\u672C\u201C\u8F6F\u4EF6\u201D\u5B89\u88C5\u5728\u4EFB\u4F55\u8BA1\u7B97\u673A\u4E0A\u3002\u540C\u65F6\u60A8\u5728\u4F7F\u7528\u672C\u201C\u8F6F\u4EF6\u201D\u65F6\u8FD8\u9700\u540C\u65F6\u9075\u5B88\u4E3A\u4F7F\u60A8\u6709\u6743\u4F7F\u7528\u672C\u201C\u8F6F\u4EF6\u201D\u800C\u4E0E\u672C\u516C\u53F8\u516C\u7B7E\u8BA2\u7684\u5176\u4ED6\u534F\u8BAE\uFF08\u5982\u6709\uFF09\u6216\u4E3A\u8BC1\u660E\u60A8\u6709\u6743\u4F7F\u7528\u672C\u201C\u8F6F\u4EF6\u201D\u800C\u7531\u7C73\u6CE2\u7F51\u7EDC\u7684\u6388\u6743\u6587\u4EF6\uFF08\u5982\u6709\uFF09\u4E2D\u7684\u5168\u90E8\u6761\u6B3E\u548C\u6761\u4EF6\u3002</strong></p>\n        <p>\u672C\u201C\u8F6F\u4EF6\u201D\u53D7\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u8457\u4F5C\u6743\u6CD5\u53CA\u56FD\u9645\u8457\u4F5C\u6743\u6761\u7EA6\u548C\u5176\u5B83\u77E5\u8BC6\u4EA7\u6743\u6CD5\u548C\u6761\u7EA6\u7684\u4FDD\u62A4\u3002\u672C\u201C\u8F6F\u4EF6\u201D\u6743\u5229\u53EA\u8BB8\u53EF\u4F7F\u7528\uFF0C\u800C\u4E0D\u51FA\u552E\u3002</p>\n        <h3>\u4E00\uFF0E\u60A8\u4FDD\u8BC1</h3>\n        <p> 1.\u4E0D\u5F97\u4EE5\u4EFB\u4F55\u624B\u6BB5\u5728\u672C\u516C\u53F8\u672A\u7ECF\u6388\u6743\u7684\u60C5\u51B5\u4E0B\u8F6C\u552E\u3001\u5012\u5356\u672C\u8F6F\u4EF6\u5168\u90E8\u6216\u90E8\u5206\u6E90\u7801\u3002<br>\n            2.\u672A\u7ECF\u6388\u6743\u4E0D\u5F97\u66F4\u6539\u672C\u516C\u53F8\u7684\u7248\u6743\u4FE1\u606F\u3002\n        </p>\n        <h3>\u4E8C\uFF0E\u672C\u201C\u7CFB\u7EDF\u201D\u7684\u8457\u4F5C\u6743\u53CA\u5176\u4ED6\u77E5\u8BC6\u4EA7\u6743</h3>\n        <p>1.\u60A8\u4E0D\u5F97\u53BB\u6389\u6216\u4EE5\u4EFB\u4F55\u65B9\u5F0F\u9690\u853D\u672C\u201C\u8F6F\u4EF6\u201D\u4E0A\u7684\u4EFB\u4F55\u7248\u6743\u6807\u8BC6\uFF08\u6216\u5176\u4EFB\u4F55\u90E8\u5206\uFF09\uFF0C\u5E76\u5E94\u5728\u5176\u6240\u6709\u590D\u5236\u54C1\u4E0A\u4F9D\u7167\u5176\u73B0\u6709\u8868\u8FF0\u65B9\u5F0F\u6807\u6CE8\u5176\u7248\u6743\u5C5E\u4E8E\u7C73\u6CE2\u7F51\u7EDC\u3002<br>\n            2.\u672C\u201C\u8F6F\u4EF6\u201D\uFF08\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u672C\u201C\u8F6F\u4EF6\u201D\u4E2D\u6240\u542B\u7684\u4EFB\u4F55\u56FE\u50CF\u3001\u7167\u7247\u3001\u52A8\u753B\u3001\u5F55\u50CF\u3001\u5F55\u97F3\u3001\u97F3\u4E50\u3001\u6587\u5B57\u548C\u9644\u52A0\u7A0B\u5E8F\uFF09\u3001\u968F\u9644\u7684\u6587\u6863\u7535\u5B50\u6216\u5370\u5237\u6750\u6599\u53CA\u672C\u201C\u8F6F\u4EF6\u201D\u4EFB\u4F55\u526F\u672C\u7684\u8457\u4F5C\u6743\u53CA\u5176\u4ED6\u77E5\u8BC6\u4EA7\u6743\uFF0C\u5747\u7C73\u6CE2\u7F51\u7EDC\u62E5\u6709\uFF08\u5C5E\u4E8E\u7B2C\u4E09\u65B9\u6240\u6709\u4E4B\u5546\u6807\u53CA\u7B2C\u4E09\u65B9\u6240\u6709\u4E4B\u5176\u4ED6\u6743\u5229\u9664\u5916\uFF09\u3002<br>\n            3.\u672C\u201C\u8F6F\u4EF6\u201D\u53CA\u6587\u6863\u7535\u5B50\u6216\u5370\u5237\u6750\u6599\u4EAB\u6709\u7248\u6743\uFF0C\u5E76\u53D7\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u8457\u4F5C\u6743\u6CD5\u53CA\u56FD\u9645\u6761\u7EA6\u6761\u6B3E\u7684\u4FDD\u62A4\u3002<br>\n            4.\u60A8\u4E0D\u53EF\u4EE5\u4ECE\u672C\u201C\u8F6F\u4EF6\u201D\u4E2D\u53BB\u6389\u5176\u7248\u6743\u58F0\u660E\uFF08\u6216\u5176\u4EFB\u4F55\u90E8\u5206\uFF09\uFF1B\u5E76\u4FDD\u8BC1\u4E3A\u672C\u201C\u8F6F\u4EF6\u201D\u7684\u590D\u5236\u54C1\u590D\u5236\u53CA\u8F7D\u9644\u540C\u6837\u7684\u7248\u6743\u58F0\u660E\u3002<br>\n            5.\u60A8\u4E0D\u5F97\u4EE5\u4EFB\u4F55\u5F62\u5F0F\u975E\u6CD5\u590D\u5236\u672C\u201C\u8F6F\u4EF6\u201D\u53CA\u6587\u6863\u7535\u5B50\u6216\u5370\u5237\u6750\u6599\uFF08\u6216\u5176\u4EFB\u4F55\u90E8\u5206\uFF09\u3002</p>\n        <h3>\u4E09\uFF0E\u8D23\u4EFB\u6709\u9650</h3>\n        <p><strong>\u5728\u9002\u7528\u6CD5\u5F8B\u6240\u5141\u8BB8\u7684\u6700\u5927\u8303\u56F4\u5185\uFF0C\u672C\u516C\u53F8\u6216\u5176\u4F9B\u5E94\u5546\u7EDD\u4E0D\u5C31\u56E0\u4F7F\u7528\u6216\u4E0D\u80FD\u4F7F\u7528\u672C\u201C\u8F6F\u4EF6\u201D\u6240\u5F15\u8D77\u7684\u6216\u6709\u5173\u7684\u4EFB\u4F55\u95F4\u63A5\u7684\u3001\u610F\u5916\u7684\u3001\u76F4\u63A5\u7684\u3001\u7279\u6B8A\u7684\u3001\u60E9\u7F5A\u6027\u7684\u6216\u5176\u5B83\u4EFB\u4F55\u635F\u5BB3\uFF08\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u8D22\u4EA7\u635F\u574F\u800C\u9020\u6210\u7684\u635F\u5BB3\uFF0C\u56E0\u5229\u6DA6\u635F\u5931\u3001\u6570\u636E\u635F\u5931\u3001\u8425\u4E1A\u4E2D\u65AD\u3001\u8BA1\u7B97\u673A\u762B\u75EA\u6216\u6545\u969C\u3001\u5546\u4E1A\u4FE1\u606F\u7684\u9057\u5931\u800C\u9020\u6210\u7684\u635F\u5BB3\uFF0C\u56E0\u672A\u80FD\u5C65\u884C\u5305\u62EC\u8BDA\u4FE1\u6216\u76F8\u5F53\u6CE8\u610F\u5728\u5185\u7684\u4EFB\u4F55\u8D23\u4EFB\u81F4\u4F7F\u9690\u79C1\u6CC4\u9732\u800C\u9020\u6210\u7684\u635F\u5BB3\uFF0C\u56E0\u758F\u5FFD\u800C\u9020\u6210\u7684\u635F\u5BB3\uFF0C\u6216\u56E0\u4EFB\u4F55\u91D1\u94B1\u4E0A\u7684\u635F\u5931\u6216\u4EFB\u4F55\u5176\u5B83\u635F\u5931\u800C\u9020\u6210\u7684\u635F\u5BB3,\u4F46\u672C\u516C\u53F8\u6216\u5176\u4F9B\u5E94\u5546\u7684\u6545\u610F\u6216\u91CD\u5927\u8FC7\u5931\u9020\u6210\u60A8\u7684\u8D22\u4EA7\u635F\u5931\u7684\u9664\u5916\uFF09\u627F\u62C5\u8D54\u507F\u8D23\u4EFB\uFF0C\u5373\u4F7F\u672C\u516C\u53F8\u6216\u5176\u4EFB\u4F55\u4F9B\u5E94\u5546\u4E8B\u5148\u88AB\u544A\u77E5\u8BE5\u635F\u5BB3\u53D1\u751F\u7684\u53EF\u80FD\u6027\u3002\u5373\u4F7F\u8865\u6551\u63AA\u65BD\u672A\u80FD\u8FBE\u5230\u9884\u5B9A\u76EE\u7684\uFF0C\u672C\u635F\u5BB3\u8D54\u507F\u6392\u9664\u6761\u6B3E\u5C06\u4ECD\u7136\u6709\u6548\u3002\u5728\u9002\u7528\u6CD5\u5F8B\u6240\u5141\u8BB8\u7684\u6700\u5927\u8303\u56F4\u5185\uFF0C\u4E0D\u8BBA\u4F55\u79CD\u60C5\u51B5\uFF0C\u672C\u516C\u53F8\u53CA\u5176\u4F9B\u5E94\u5546\u5728\u672C\u300A\u534F\u8BAE\u300B\u4EFB\u4F55\u6761\u6B3E\u4E0B\u6240\u627F\u62C5\u7684\u5168\u90E8\u8D23\u4EFB\uFF0C\u4EE5\u60A8\u83B7\u5F97\u672C\u300A\u534F\u8BAE\u300B\u7EA6\u5B9A\u4E4B\u672C\u201C\u8F6F\u4EF6\u201D\u6388\u6743\u800C\u652F\u4ED8\u7684\u5408\u7406\u6B3E\u9879\uFF08\u5982\u6709\uFF09\u4E3A\u9650\uFF0C\u5982\u60A8\u7CFB\u514D\u8D39\u83B7\u5F97\u672C\u201C\u8F6F\u4EF6\u201D\uFF0C\u5219\u672C\u516C\u53F8\u53CA\u5176\u4F9B\u5E94\u5546\u65E0\u4E49\u52A1\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u6216\u5411\u60A8\u652F\u4ED8\u4EFB\u4F55\u8D54\u507F\u3002\u540C\u65F6\uFF0C\u672C\u516C\u53F8\u5BF9\u60A8\u6216\u7B2C\u4E09\u65B9\u63D0\u4F9B\u7684\u5E94\u7528\u4E8E\u6216\u64CD\u4F5C\u4E8E\u672C\u201C\u8F6F\u4EF6\u201D\u7684\u5185\u5BB9\u6216\u4E0E\u8BE5\u5185\u5BB9\u76F8\u5173\u7684\u5176\u4ED6\u5185\u5BB9\u800C\u5F15\u8D77\u7684\u4EFB\u4F55\u7D22\u8D54\u6216\u635F\u5BB3\u4E0D\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u3002</strong></p>\n        <h3>\u56DB\uFF0E\u8BB8\u53EF\u7EC8\u6B62</h3>\n        <p>1.\u5982\u60A8\u672A\u9075\u5B88\u672C\u300A\u534F\u8BAE\u300B\u7684\u5404\u9879\u6761\u6B3E\u548C\u6761\u4EF6\uFF0C\u672C\u516C\u53F8\u53EF\u7EC8\u6B62\u672C\u300A\u534F\u8BAE\u300B\u3002\u7EC8\u6B62\u672C\u300A\u534F\u8BAE\u300B\u65F6\uFF0C\u60A8\u5FC5\u987B\u7ACB\u5373\u5378\u8F7D\u672C\u201D\u8F6F\u4EF6\u201C\u6216\u9500\u6BC1\u672C\u201C\u8F6F\u4EF6\u201D\u7684\u6240\u6709\u590D\u5236\u54C1\uFF0C\u9644\u968F\u7684\u6587\u6863\u7535\u5B50\u6216\u5370\u5237\u6750\u6599\uFF0C\u6216\u8005\u5C06\u5176\u5F52\u8FD8\u7ED9\u672C\u516C\u53F8\u3002&nbsp;<br>\n            2.\u901A\u8FC7\u5411\u60A8\u63D0\u4F9B\u672C\u201C\u8F6F\u4EF6\u201D\u7684\u4EFB\u4F55\u66FF\u6362\u7248\u672C\u6216\u4FEE\u6539\u7248\u672C\u6216\u5347\u7EA7\u7248\u672C\u7684\u4E00\u4EFD\u53D6\u4EE3\u300A\u534F\u8BAE\u300B\uFF0C\u5E76\u89C4\u5B9A\u60A8\u4F7F\u7528\u8FD9\u7C7B\u66FF\u6362\u7248\u672C\u6216\u4FEE\u6539\u7248\u672C\u6216\u5347\u7EA7\u7248\u672C\u7684\u6761\u4EF6\u662F\u60A8\u63A5\u53D7\u8FD9\u7C7B\u53D6\u4EE3\u300A\u534F\u8BAE\u300B\uFF0C\u672C\u516C\u53F8\u53EF\u4EE5\u7EC8\u6B62\u672C\u300A\u534F\u8BAE\u300B\u3002</p>\n        <h3>\u4E94.\u9002\u7528\u3001\u7BA1\u8F96\u6CD5\u5F8B\u53CA\u6761\u6B3E\u6548\u529B</h3>\n        <p>1.\u672C\u300A\u534F\u8BAE\u300B\u7684\u8BA2\u7ACB\u3001\u6267\u884C\u548C\u89E3\u91CA\u53CA\u4E89\u8BAE\u7684\u89E3\u51B3\u5747\u5E94\u9002\u7528\u4E2D\u56FD\u5927\u9646\u6CD5\u5F8B\u3002<br>\n            2.\u5982\u60A8\u4E0E\u672C\u516C\u53F8\u5C31\u672C\u300A\u534F\u8BAE\u300B\u5185\u5BB9\u6216\u5176\u6267\u884C\u53D1\u751F\u4EFB\u4F55\u4E89\u8BAE\uFF0C\u53CC\u65B9\u5E94\u8FDB\u884C\u53CB\u597D\u534F\u5546\uFF1B\u534F\u5546\u4E0D\u6210\u65F6\uFF0C\u4EFB\u4F55\u4E00\u65B9\u5747\u53EF\u5411\u672C\u516C\u53F8\u516C\u4F4F\u6240\u5730\u6709\u7BA1\u8F96\u6743\u7684\u4EBA\u6C11\u6CD5\u9662\u63D0\u8D77\u8BC9\u8BBC\u3002<br>\n            3.\u672C\u300A\u534F\u8BAE\u300B\u7684\u5404\u9879\u6761\u6B3E\u5177\u6709\u53EF\u5206\u5272\u6027\uFF0C\u5982\u679C\u67D0\u4E00\u6761\u6B3E\u88AB\u9002\u7528\u6CD5\u5F8B\u8BA4\u5B9A\u4E3A\u65E0\u6548\uFF0C\u5219\u5176\u4ED6\u6761\u6B3E\u4E0D\u53D7\u5F71\u54CD\uFF0C\u5E94\u7EE7\u7EED\u6709\u6548\u5E76\u6267\u884C\u3002\n        </p>\n        <p>\u81F3\u6B64\uFF0C\u60A8\u80AF\u5B9A\u5DF2\u7ECF\u8BE6\u7EC6\u9605\u8BFB\u5E76\u5DF2\u7406\u89E3\u672C\u300A\u534F\u8BAE\u300B\uFF0C\u5E76\u540C\u610F\u4E25\u683C\u9075\u5B88\u5404\u6761\u6B3E\u548C\u6761\u4EF6\u3002</p>\n        "
    };
    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var btnProps = {
        onClick: function onClick() {
          return _this2.next();
        },
        type: this.state.agree ? 'primary' : 'ghost'
      };
      return React.createElement(antd_1.Form, {
        className: index_scss_1.cx({
          imsInfo: true
        })
      }, React.createElement(antd_1.Form.Item, {
        className: "detail"
      }, React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: this.state.info
        }
      })), React.createElement(antd_1.Form.Item, null, React.createElement("div", {
        className: index_scss_1.cx({
          footerBar: true
        })
      }, React.createElement(antd_1.Checkbox, {
        onChange: function onChange(e) {
          return _this2.setState({
            agree: e.target.checked
          });
        }
      }, "\u6211\u5DF2\u4ED4\u7EC6\u9605\u8BFB\u5E76\u7406\u89E3\u6B64\u534F\u8BAE"), React.createElement(antd_1.Button, btnProps, "\u4E0B\u4E00\u6B65"))));
    }
  }, {
    key: "next",
    value: function next() {
      if (this.state.agree) {
        this.props.next({
          agree: this.state.agree
        });
      } else {
        antd_1.message.error("\u8BF7\u60A8\u4ED4\u7EC6\u9605\u8BFB\u672C\u534F\u8BAE\uFF0C\u5E76\u540C\u610F\u672C\u534F\u8BAE");
      }
    }
  }]);

  return Index;
}(React.Component);

exports["default"] = Index;

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss":
/*!***************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var style = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./index.scss */ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss");
    var classNames = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/index.js */ "../node_modules/_classnames@2.2.6@classnames/index.js");
    var classNamesBind = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/bind.js */ "../node_modules/_classnames@2.2.6@classnames/bind.js");
    var cx = classNamesBind.bind(style);

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.style = style
    exports.classNames = exports.cn = classNames;
    exports.default = exports.classNamesBind = exports.cx = cx;
  

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.jsx":
/*!***********************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.jsx ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var install_scss_1 = __webpack_require__(/*! ./install.scss */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss");

var ims_util_1 = __importDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'ims-util'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

var antd_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'antd'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var bind_1 = __importDefault(__webpack_require__(/*! ./bind */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.jsx"));

var finish_1 = __importDefault(__webpack_require__(/*! ./finish */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.jsx"));

var setting_1 = __importDefault(__webpack_require__(/*! ./setting */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.jsx"));

var info_1 = __importDefault(__webpack_require__(/*! ./info */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.jsx"));

var GlobalFooter_1 = __importDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'ant-design-pro/lib/GlobalFooter'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

var logo_v3_png_1 = __importDefault(__webpack_require__(/*! ./logo-v3.png */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/logo-v3.png"));

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).apply(this, arguments));
    _this.state = {
      step: 0,
      db: {
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '123456'
      },
      user: {
        username: 'admin',
        password: '123456'
      }
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "install",
    value: function install() {
      ims_util_1["default"].http.post('/ims-install/install', this.state).then(function (res) {
        console.log(res);
      });
    }
  }, {
    key: "changeDb",
    value: function changeDb(key, value) {
      var db = this.state.db;
      db[key] = value;
      this.setState({
        db: db
      });
    }
  }, {
    key: "nextStep",
    value: function nextStep() {
      this.setState({
        step: this.state.step + 1
      });
    }
  }, {
    key: "prevStep",
    value: function prevStep() {
      this.setState({
        step: this.state.step - 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        className: install_scss_1.cx({
          imsInstall: true
        })
      }, React.createElement("div", {
        className: install_scss_1.cx({
          content: true
        })
      }, React.createElement("div", {
        className: install_scss_1.cx({
          container: true
        })
      }, React.createElement("div", {
        className: install_scss_1.cx({
          login: true
        })
      }, React.createElement("div", {
        className: install_scss_1.cx({
          loginHeader: true
        })
      }, React.createElement("img", {
        src: logo_v3_png_1["default"],
        alt: ""
      })), React.createElement(antd_1.Steps, {
        style: {
          minWidth: '650px'
        },
        current: this.state.step
      }, React.createElement(antd_1.Steps.Step, {
        title: "\u534F\u8BAE",
        icon: React.createElement(antd_1.Icon, {
          type: "property-safety"
        })
      }), React.createElement(antd_1.Steps.Step, {
        title: "\u914D\u7F6E",
        icon: React.createElement(antd_1.Icon, {
          type: "setting"
        })
      }), React.createElement(antd_1.Steps.Step, {
        title: "\u8D26\u6237",
        icon: React.createElement(antd_1.Icon, {
          type: "user"
        })
      }), React.createElement(antd_1.Steps.Step, {
        title: "\u5B8C\u6210",
        icon: React.createElement(antd_1.Icon, {
          type: "smile-o"
        })
      })), React.createElement("div", {
        className: install_scss_1.cx({
          mainForm: true
        })
      }, this.state.step === 0 ? React.createElement(info_1["default"], {
        next: function next() {
          return _this2.nextStep();
        }
      }) : null, this.state.step === 1 ? React.createElement(setting_1["default"], {
        prev: function prev() {
          return _this2.prevStep();
        },
        next: function next() {
          return _this2.nextStep();
        }
      }) : null, this.state.step === 2 ? React.createElement(bind_1["default"], {
        prev: function prev() {
          return _this2.prevStep();
        },
        next: function next() {
          return _this2.nextStep();
        }
      }) : null, this.state.step === 3 ? React.createElement(finish_1["default"], {
        prev: function prev() {
          return _this2.prevStep();
        }
      }) : null))), React.createElement(GlobalFooter_1["default"], {
        copyright: React.createElement("div", null, React.createElement("p", null, "Copyright \xA9 2019 \u676D\u5DDE\u7C73\u6CE2\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8"), React.createElement("p", null, "\u7F51\u7AD9\u5907\u6848/\u8BB8\u53EF\u8BC1\u53F7\uFF1A\u8C6BICP\u590714020079\u53F7-3"))
      })));
    }
  }]);

  return Index;
}(React.Component);

exports["default"] = Index;

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss":
/*!************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var style = __webpack_require__(/*! ../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./install.scss */ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss");
    var classNames = __webpack_require__(/*! ../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/index.js */ "../node_modules/_classnames@2.2.6@classnames/index.js");
    var classNamesBind = __webpack_require__(/*! ../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/bind.js */ "../node_modules/_classnames@2.2.6@classnames/bind.js");
    var cx = classNamesBind.bind(style);

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.style = style
    exports.classNames = exports.cn = classNames;
    exports.default = exports.classNamesBind = exports.cx = cx;
  

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/logo-v3.png":
/*!***********************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/logo-v3.png ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAAAtCAMAAABPq6N6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyZTEyZTgzZC0zMWVhLTQ2OGMtODIwYy1jYzMxMTE0NGM3MDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkZEOTc4ODg1NjlGMTFFOThENUZFODU3QTNEMEI3NEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkZEOTc4ODc1NjlGMTFFOThENUZFODU3QTNEMEI3NEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkOTVlM2IzMC1kMDM5LTQ3MTMtYjIxZi1mYWYxYWYzMTYzYjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MmUxMmU4M2QtMzFlYS00NjhjLTgyMGMtY2MzMTExNDRjNzA0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+w+8UNAAAAwBQTFRFydTfud7/Q5PZYbT/ndD/7fb/abj/jajAyOX/0en/cZzDfaHB2dzf+v3/weL/RZDW6err4PD/jMj/odP/8fj/3N7g4OLk1djccbz/vcbOprbFrdj/Ua3/2e3/C4n6Eo//HpX/qbjGKZr/nrHDRaf/MY/mmK7CtcHLiabA5e3zPZPdvuD/Jpj/xuT/kMr/bJnE+Pj40tbaOqL/WJXMXZfJXLL/6PT/aZrFKpHtNJ//obPCSKj/5efp9vb2i6O68/P09PT1Sqn/FpH/eJ7CkKrBKIPXl87/UZXQQKX/3O7/sNn/0NTYdL3/3+HjhsX/ZpnGbLn/5vP/5PL/qNb/isf/hqTAW5XLNpHjSJHUsb3I9/v/zef/Zrf/lq3Ctdz/PaP/z+j/S6r/GZb/yc/U9fr/6vX/8vLzTpLQXrP/7e7uq9f/T5bRjKfAGpL/rLrGIZb/MZLmhKTBTqv/NqD/3vD/TKr/Q6b/sr7JdJ3CM57/bpW5ZLb/wMjP8PHxIJb/rrzIFJD/esD/O5HeW7H/Lpz/xMvRVpbNU5XOgsT/PqT/T6z/y+b/gKLBeqDCLJv/VZPNf8L/eL//UpPQOZHgGpr/OoXKGZL/////+Pz/ZLX/1Or/pNT//f7/Va//pdX//P7/WLD/Vq//+vr6+/v7JJf/VK7//Pz84fH/R6j/ms//+fz/MJ3//f39HJP/1uv/5+jpo7TEgcP/Va7/0tbZS5PTk8z/pdT/+/3/Y5fHcLv/8fHy9/z/mrDCptX/7/Dw6uvs09faS5XTSJTVXJbMMJboYpjIr7zIX4+7LZPrXZLEVI7Coa+/uMDJuMLM1ev/JIjkyeb/q7fDapnETpHPbpvEbp3DJ5HxV7D/hqbBH5P50dXZ4/L//f7+5Obn4uTlJZb09PX3X7T/vN//GJH/7vf/aLf/tr3GXLH/5/T/NJXkfJy7+vr7+vv7wcnQx83TP5Db2ePsOY/gs7/KhqXB/v7/lKzBlKzCHKj/lq3Bl67CH5X/1Ov/IJL3IZT2GJL/////G/ExawAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAY/SURBVHja7Jh5VFRVHMfVYQdZBARZZIARUWaMRVAERQIRkZBNwNgVEAkdFUUQTDYXEFFRB5ApZtiGVXBB1KjIimwvI+tYURntiwnZYnZ/3Tfre8PocQ6Mp9Ph/vHu7/e97zfzOe/e+7vLFPhPlSmTOJM4/yOcqiqyRHhSpUpRkKRV9KbiMg4cp29r0ovT4zQ04tLTaTV5RgCC0DiaOy2P5m6lrSAowreYVkPj8fmFvfC373aiJGcz+Brm5nlNjOxk7JW1jQOnWqDtZNlkY2PTeTDCSTu8F4Crbq2f4YkVm7ixMW2uRAM7Tu29YQCWjbBwvtZPTWkDrsAy/SvCrx7v2IlFCLlT2so87RC6u2pMzFT8JspWFzlahIPyUmGqhheDtyAMwKgGPc4ZN84pDkI1lLbkL4PxP50ZE1NDAPQACWcGaCcKsRC7FiCMPRE4SB7HN51ArEiVC1nFdsWv1pJwguEUE0lKBAjoqsH5CM5iMUAuJIQZScUpSQV3KQ2ySzXqVA3OM5CAxcQnKWpKySVLKk4hpMo+DkILBEhVOG2BWLWkqEGc2CAqThDuHhKO1yGV4YAaVssoapMrRFBxWFDtSsJ5WkN1OMPtCG3WJ4mnOQHwLBUHN0cgSlEZDoTIyUc7w+RxWnFlTH80OEaNCNFPSzUTpgbI41gRtXbyI8GBUJx7jsmWKw5rDA5KIIy6C+2PAicW49iFSbVAGIvTLlpITGYwVY8DPCKXiKUkjpoCHJQl7k2Pg40qxyFWzCwTkRR8N1URDmIGid3w4E4V4/QycMvzQlOdfQkU4iAU6iEWtH3lcdLmiY15X0i1jh9F9U/zOpTEAWMi1XKFFufQ/XCQXat4MZleKIdjP9sMlm3AxusrGiTaEyuWCOuu2T8oi2OSi5tuElY2A+6Lg5BrRq9IO0PFuTIIsH8NNmIGpZrpiVFRfW+WsjgQKd6ZsTi1D8JBiCHK39O9yDiaB5qdIafPMEcv2kz2xY77mKbh2mKji6aFkjgCPIE3J+EU1Kj+YByE4oQpIYOEs+7lPZA54jhgOK1vpey3V16pNNCDG6Pzo2OOxCuJA+a4zRzCOsXp8AE4qIRF8Dc+Jwm9MeqTs9reQfOO4za/bthgP1Oobpg/srrBz9Zb022oXunOgqTNCDWqq3GSFOJQlivUiF9KyZLukS4317/y8aKii7/nWLyUufB2lItQXdiHH91Xm/3fHtVRHke42wth7ARFOPQMJoWHj88a5C3b3vnOv/SDoV6f/19FpuIOnGbmX+QAL5pFbdLd6nZYaRwiFdI5EQpx2EYM6ucJgxRPGY5zzKzL+fFRG3VHIO36iFDyrow/v3VW/erlH24trzxyzlBpnLoW3JprohDHbnokBYdjDTvY0rEDa6/6GJb75/vv8TPddNybUJp1f4a5tyA+etq+mZCp07BP7+Fw+DL7AvmIQ8Xx5AoovcUOJ8+st2IW2cKWjcu/N9036HJelKXxcJ67+JpZ9+DQQKbBYoM5bssf5pzlayWzTbJQ5zsSh9ixtkpx8BofQMZpArCS4ni/8dnaJbDkcMP+paCzUFesWlTOKcoHTXuLx2zXXIP6joc5hXpUkEYAzEA8IM/7dClOmVgRF7oWZMiy8pQhyOmGnF0vLHI2c1mfL1ki+tddBMjPwWbm2Jm1o9a45yhxZqCHRgYYB+EhItBvDcUnYr5akJa1aMR8QhcdKIymLrAS/m1uTY9TOIFDgHEPSgdyAmgxKYuE297mA5fPvTqqt+tEuVTcssZ2bv9TeND8qTsGx5juWhqYfLapyYoRmJhVog0mxaWl2dt5vO1evjtbxHudnu+I5zDfNbGFz+PxziYHlibSqjFOFkv4lYrvEkmw0AMsmZQltCE6/842cFg/MGAw8PlgmmSAr3f0N/C7FuXoaEu49VUkHC5lyPRit47ki+1eiid1WAUFBS3GAhwzHMuybuM6lWHBpkCGM/OerYMz6LjF63ZB+R/X/W4Q4tA/KzvqnQH0ym9fv/VBjMHhTyfo9iup3TO3wi6RFmKccDNB7djOCrtcT8/cLNn9Tte7/fi5qYuYPWnLdu9+X8h40lSSlt48ueK1b5ZO1GVcFVdU6oSFsH4jHqTbr1/rFYQ1TF5VTuJMbPlXgAEAHe379K3lYokAAAAASUVORK5CYII="

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.jsx":
/*!*****************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.jsx ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var antd_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'antd'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var index_scss_1 = __webpack_require__(/*! ./index.scss */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss");

var ims_util_1 = __importDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'ims-util'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).call(this, props));
    _this.state = {
      host: {
        hasFeedback: true,
        required: true,
        validateStatus: '',
        label: '数据库地址',
        value: 'localhost',
        placeholder: '数据库地址'
      },
      port: {
        hasFeedback: true,
        required: true,
        validateStatus: '',
        label: '端口号',
        placeholder: '请输入端口号',
        value: '3306'
      },
      username: {
        hasFeedback: true,
        required: true,
        validateStatus: '',
        label: '用户名',
        placeholder: '请输入用户名',
        value: 'root'
      },
      password: {
        hasFeedback: true,
        required: true,
        validateStatus: '',
        label: '密码',
        placeholder: '请输入密码',
        value: ''
      }
    };
    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var nextBtnProps = {
        type: "primary",
        onClick: function onClick() {
          return _this2.next();
        }
      };
      var prevBtnProps = {
        onClick: function onClick() {
          return _this2.props.prev();
        }
      };
      var _this$state = this.state,
          username = _this$state.username,
          host = _this$state.host,
          port = _this$state.port,
          password = _this$state.password;
      return React.createElement(antd_1.Form, {
        className: index_scss_1.cx({
          imsSetting: true
        }),
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        }
      }, React.createElement(antd_1.Form.Item, host, React.createElement(antd_1.Input, {
        value: host.value,
        onChange: function onChange(e) {
          return _this2.setHost(e.target.value);
        },
        placeholder: host.placeholder
      })), React.createElement(antd_1.Form.Item, port, React.createElement(antd_1.Input, {
        value: port.value,
        onChange: function onChange(e) {
          return _this2.setPort(e.target.value);
        },
        placeholder: port.placeholder
      })), React.createElement(antd_1.Form.Item, username, React.createElement(antd_1.Input, {
        value: username.value,
        onChange: function onChange(e) {
          return _this2.setUsername(e.target.value);
        },
        placeholder: username.placeholder
      })), React.createElement(antd_1.Form.Item, password, React.createElement(antd_1.Input, {
        type: "password",
        value: password.value,
        onChange: function onChange(e) {
          return _this2.setPassword(e.target.value);
        },
        placeholder: password.placeholder
      })), React.createElement(antd_1.Form.Item, {
        wrapperCol: {
          span: 12,
          offset: 8
        }
      }, React.createElement("div", {
        className: index_scss_1.cx({
          footerBar: true
        })
      }, React.createElement(antd_1.Button, prevBtnProps, "\u4E0A\u4E00\u6B65"), React.createElement(antd_1.Button, nextBtnProps, "\u4E0B\u4E00\u6B65"))));
    }
  }, {
    key: "setUsername",
    value: function setUsername(val) {
      this.setState({
        username: _objectSpread({}, this.state.username, {
          value: val,
          validateStatus: 'success'
        })
      });
    }
  }, {
    key: "setPassword",
    value: function setPassword(val) {
      this.setState({
        password: _objectSpread({}, this.state.password, {
          value: val,
          validateStatus: 'success'
        })
      });
    }
  }, {
    key: "setHost",
    value: function setHost(val) {
      this.setState({
        host: _objectSpread({}, this.state.host, {
          value: val,
          validateStatus: 'success'
        })
      });
    }
  }, {
    key: "setPort",
    value: function setPort(val) {
      this.setState({
        port: _objectSpread({}, this.state.port, {
          value: val,
          validateStatus: 'success'
        })
      });
    }
  }, {
    key: "next",
    value: function next() {
      var _this3 = this;

      if (this.state.host.value.length <= 0) {
        return this.setState({
          host: _objectSpread({}, this.state.host, {
            validateStatus: 'error'
          })
        });
      }

      if (this.state.password.value.length <= 0) {
        return this.setState({
          password: _objectSpread({}, this.state.password, {
            validateStatus: 'error'
          })
        });
      }

      if (this.state.username.value.length <= 0) {
        return this.setState({
          username: _objectSpread({}, this.state.username, {
            validateStatus: 'error'
          })
        });
      }

      if (this.state.port.value.length <= 0) {
        return this.setState({
          port: _objectSpread({}, this.state.port, {
            validateStatus: 'error'
          })
        });
      } // 配置并连接数据库


      ims_util_1["default"].http.post('ims-install/setDatabase', {
        host: this.state.host.value,
        port: this.state.port.value,
        username: this.state.username.value,
        password: this.state.password.value
      }).then(function (res) {
        // 返回结果
        if (res.data.code === -1) {
          antd_1.message.error(res.data.message);
        } else {
          _this3.props.next();
        }
      });
    }
  }]);

  return Index;
}(React.Component);

Index.defaultProps = {};
exports["default"] = Index;

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss":
/*!******************************************************************************************************************************************!*\
  !*** /usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var style = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./index.scss */ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss");
    var classNames = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/index.js */ "../node_modules/_classnames@2.2.6@classnames/index.js");
    var classNamesBind = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_classnames@2.2.6@classnames/bind.js */ "../node_modules/_classnames@2.2.6@classnames/bind.js");
    var cx = classNamesBind.bind(style);

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.style = style
    exports.classNames = exports.cn = classNames;
    exports.default = exports.classNamesBind = exports.cx = cx;
  

/***/ }),

/***/ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_webpack@4.30.0@webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "../node_modules/_classnames@2.2.6@classnames/bind.js":
/*!************************************************************!*\
  !*** ../node_modules/_classnames@2.2.6@classnames/bind.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = _typeof(arg);

      if (argType === 'string' || argType === 'number') {
        classes.push(this && this[arg] || arg);
      } else if (Array.isArray(arg)) {
        classes.push(classNames.apply(this, arg));
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(this && this[key] || key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames["default"] = classNames;
    module.exports = classNames;
  } else if ( true && _typeof(__webpack_require__(/*! !webpack amd options */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_webpack@4.30.0@webpack/buildin/amd-options.js")) === 'object' && __webpack_require__(/*! !webpack amd options */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_webpack@4.30.0@webpack/buildin/amd-options.js")) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    window.classNames = classNames;
  }
})();

/***/ }),

/***/ "../node_modules/_classnames@2.2.6@classnames/index.js":
/*!*************************************************************!*\
  !*** ../node_modules/_classnames@2.2.6@classnames/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = _typeof(arg);

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames["default"] = classNames;
    module.exports = classNames;
  } else if ( true && _typeof(__webpack_require__(/*! !webpack amd options */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_webpack@4.30.0@webpack/buildin/amd-options.js")) === 'object' && __webpack_require__(/*! !webpack amd options */ "../../../usr/local/lib/node_modules/ims-cli/node_modules/_webpack@4.30.0@webpack/buildin/amd-options.js")) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    window.classNames = classNames;
  }
})();

/***/ }),

/***/ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js */ "../node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".ims-bind .footer-bar {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-justify-content: space-between;\n          justify-content: space-between; }\n\n.ims-bind .mobile {\n  display: -webkit-flex;\n  display: flex; }\n", "",{"version":3,"sources":["index.scss"],"names":[],"mappings":"AAAA;EACE,qBAAa;EAAb,aAAa;EACb,2BAAmB;UAAnB,mBAAmB;EACnB,sCAA8B;UAA9B,8BAA8B,EAAE;;AAElC;EACE,qBAAa;EAAb,aAAa,EAAE","file":"index.scss","sourcesContent":[".ims-bind .footer-bar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n\n.ims-bind .mobile {\n  display: flex; }\n"]}]);

// Exports
exports.locals = {
	"ims-bind": "ims-bind",
	"imsBind": "ims-bind",
	"footer-bar": "footer-bar",
	"footerBar": "footer-bar",
	"mobile": "mobile"
};

/***/ }),

/***/ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js */ "../node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".ims-finish {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-align-content: center;\n          align-content: center; }\n  .ims-finish .addon_list {\n    display: -webkit-flex;\n    display: flex;\n    -webkit-justify-content: center;\n            justify-content: center; }\n    .ims-finish .addon_list .addon {\n      margin: 0 10px;\n      display: -webkit-flex;\n      display: flex;\n      -webkit-flex-direction: column;\n              flex-direction: column;\n      -webkit-justify-content: center;\n              justify-content: center;\n      -webkit-align-items: center;\n              align-items: center;\n      cursor: pointer; }\n      .ims-finish .addon_list .addon .title {\n        text-align: center;\n        margin: 5px 0px; }\n      .ims-finish .addon_list .addon .icon {\n        font-size: 30px; }\n  .ims-finish .footer-bar {\n    width: 350px;\n    margin: 0 auto;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-justify-content: center;\n            justify-content: center;\n    margin-top: 30px; }\n  .ims-finish .extra {\n    margin: 0 auto;\n    background-color: #fff;\n    padding: 10px;\n    width: 350px; }\n", "",{"version":3,"sources":["index.scss"],"names":[],"mappings":"AAAA;EACE,qBAAa;EAAb,aAAa;EACb,8BAAsB;UAAtB,sBAAsB;EACtB,+BAAuB;UAAvB,uBAAuB;EACvB,6BAAqB;UAArB,qBAAqB,EAAE;EACvB;IACE,qBAAa;IAAb,aAAa;IACb,+BAAuB;YAAvB,uBAAuB,EAAE;IACzB;MACE,cAAc;MACd,qBAAa;MAAb,aAAa;MACb,8BAAsB;cAAtB,sBAAsB;MACtB,+BAAuB;cAAvB,uBAAuB;MACvB,2BAAmB;cAAnB,mBAAmB;MACnB,eAAe,EAAE;MACjB;QACE,kBAAkB;QAClB,eAAe,EAAE;MACnB;QACE,eAAe,EAAE;EACvB;IACE,YAAY;IACZ,cAAc;IACd,qBAAa;IAAb,aAAa;IACb,+BAAuB;YAAvB,uBAAuB;IACvB,gBAAgB,EAAE;EACpB;IACE,cAAc;IACd,sBAAsB;IACtB,aAAa;IACb,YAAY,EAAE","file":"index.scss","sourcesContent":[".ims-finish {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-content: center; }\n  .ims-finish .addon_list {\n    display: flex;\n    justify-content: center; }\n    .ims-finish .addon_list .addon {\n      margin: 0 10px;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      cursor: pointer; }\n      .ims-finish .addon_list .addon .title {\n        text-align: center;\n        margin: 5px 0px; }\n      .ims-finish .addon_list .addon .icon {\n        font-size: 30px; }\n  .ims-finish .footer-bar {\n    width: 350px;\n    margin: 0 auto;\n    display: flex;\n    justify-content: center;\n    margin-top: 30px; }\n  .ims-finish .extra {\n    margin: 0 auto;\n    background-color: #fff;\n    padding: 10px;\n    width: 350px; }\n"]}]);

// Exports
exports.locals = {
	"ims-finish": "ims-finish",
	"imsFinish": "ims-finish",
	"addon_list": "addon_list",
	"addonList": "addon_list",
	"addon": "addon",
	"title": "title",
	"icon": "icon",
	"footer-bar": "footer-bar",
	"footerBar": "footer-bar",
	"extra": "extra"
};

/***/ }),

/***/ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js */ "../node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".ims-info .footer-bar {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-justify-content: space-between;\n          justify-content: space-between; }\n\n.ims-info .title {\n  text-align: center; }\n\n.ims-info .detail {\n  background-color: #fff;\n  padding: 10px 20px;\n  height: 350px;\n  overflow: auto;\n  max-width: 800px; }\n\n.ims-info .date {\n  text-align: center; }\n", "",{"version":3,"sources":["index.scss"],"names":[],"mappings":"AAAA;EACE,qBAAa;EAAb,aAAa;EACb,2BAAmB;UAAnB,mBAAmB;EACnB,sCAA8B;UAA9B,8BAA8B,EAAE;;AAElC;EACE,kBAAkB,EAAE;;AAEtB;EACE,sBAAsB;EACtB,kBAAkB;EAClB,aAAa;EACb,cAAc;EACd,gBAAgB,EAAE;;AAEpB;EACE,kBAAkB,EAAE","file":"index.scss","sourcesContent":[".ims-info .footer-bar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n\n.ims-info .title {\n  text-align: center; }\n\n.ims-info .detail {\n  background-color: #fff;\n  padding: 10px 20px;\n  height: 350px;\n  overflow: auto;\n  max-width: 800px; }\n\n.ims-info .date {\n  text-align: center; }\n"]}]);

// Exports
exports.locals = {
	"ims-info": "ims-info",
	"imsInfo": "ims-info",
	"footer-bar": "footer-bar",
	"footerBar": "footer-bar",
	"title": "title",
	"detail": "detail",
	"date": "date"
};

/***/ }),

/***/ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js */ "../node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".ims-install {\n  background-color: #f1f1f1; }\n  .ims-install .content {\n    position: relative;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-flex-direction: column;\n            flex-direction: column;\n    min-height: 100vh; }\n    .ims-install .content .container {\n      margin: 0 auto;\n      -webkit-flex: 1;\n              flex: 1;\n      display: -webkit-flex;\n      display: flex;\n      -webkit-flex-direction: column;\n              flex-direction: column;\n      -webkit-align-items: center;\n              align-items: center;\n      margin-bottom: 30px; }\n      .ims-install .content .container .login {\n        margin-top: 60px; }\n        .ims-install .content .container .login .login-header {\n          display: -webkit-flex;\n          display: flex;\n          -webkit-flex-direction: row;\n                  flex-direction: row;\n          -webkit-align-items: center;\n                  align-items: center;\n          padding: 10px;\n          margin-bottom: 20px; }\n          .ims-install .content .container .login .login-header img {\n            height: 45px; }\n          .ims-install .content .container .login .login-header h2 {\n            font-size: 40px;\n            margin-bottom: 0px;\n            text-align: center; }\n          .ims-install .content .container .login .login-header p {\n            font-size: 20px;\n            color: gray;\n            text-align: center; }\n        .ims-install .content .container .login .main-form {\n          position: relative;\n          display: -webkit-flex;\n          display: flex;\n          -webkit-flex-direction: column;\n                  flex-direction: column;\n          min-width: 450px;\n          margin-top: 30px; }\n        .ims-install .content .container .login .login-form {\n          position: relative;\n          display: -webkit-flex;\n          display: flex;\n          -webkit-flex-direction: column;\n                  flex-direction: column;\n          min-width: 450px; }\n          .ims-install .content .container .login .login-form .title {\n            margin: 10px 0px;\n            text-align: center;\n            font-size: 14px; }\n          .ims-install .content .container .login .login-form p {\n            text-align: center;\n            color: #4d4d4d;\n            font-size: 20px; }\n", "",{"version":3,"sources":["install.scss"],"names":[],"mappings":"AAAA;EACE,yBAAyB,EAAE;EAC3B;IACE,kBAAkB;IAClB,qBAAa;IAAb,aAAa;IACb,8BAAsB;YAAtB,sBAAsB;IACtB,iBAAiB,EAAE;IACnB;MACE,cAAc;MACd,eAAO;cAAP,OAAO;MACP,qBAAa;MAAb,aAAa;MACb,8BAAsB;cAAtB,sBAAsB;MACtB,2BAAmB;cAAnB,mBAAmB;MACnB,mBAAmB,EAAE;MACrB;QACE,gBAAgB,EAAE;QAClB;UACE,qBAAa;UAAb,aAAa;UACb,2BAAmB;kBAAnB,mBAAmB;UACnB,2BAAmB;kBAAnB,mBAAmB;UACnB,aAAa;UACb,mBAAmB,EAAE;UACrB;YACE,YAAY,EAAE;UAChB;YACE,eAAe;YACf,kBAAkB;YAClB,kBAAkB,EAAE;UACtB;YACE,eAAe;YACf,WAAW;YACX,kBAAkB,EAAE;QACxB;UACE,kBAAkB;UAClB,qBAAa;UAAb,aAAa;UACb,8BAAsB;kBAAtB,sBAAsB;UACtB,gBAAgB;UAChB,gBAAgB,EAAE;QACpB;UACE,kBAAkB;UAClB,qBAAa;UAAb,aAAa;UACb,8BAAsB;kBAAtB,sBAAsB;UACtB,gBAAgB,EAAE;UAClB;YACE,gBAAgB;YAChB,kBAAkB;YAClB,eAAe,EAAE;UACnB;YACE,kBAAkB;YAClB,cAAc;YACd,eAAe,EAAE","file":"install.scss","sourcesContent":[".ims-install {\n  background-color: #f1f1f1; }\n  .ims-install .content {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    min-height: 100vh; }\n    .ims-install .content .container {\n      margin: 0 auto;\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      margin-bottom: 30px; }\n      .ims-install .content .container .login {\n        margin-top: 60px; }\n        .ims-install .content .container .login .login-header {\n          display: flex;\n          flex-direction: row;\n          align-items: center;\n          padding: 10px;\n          margin-bottom: 20px; }\n          .ims-install .content .container .login .login-header img {\n            height: 45px; }\n          .ims-install .content .container .login .login-header h2 {\n            font-size: 40px;\n            margin-bottom: 0px;\n            text-align: center; }\n          .ims-install .content .container .login .login-header p {\n            font-size: 20px;\n            color: gray;\n            text-align: center; }\n        .ims-install .content .container .login .main-form {\n          position: relative;\n          display: flex;\n          flex-direction: column;\n          min-width: 450px;\n          margin-top: 30px; }\n        .ims-install .content .container .login .login-form {\n          position: relative;\n          display: flex;\n          flex-direction: column;\n          min-width: 450px; }\n          .ims-install .content .container .login .login-form .title {\n            margin: 10px 0px;\n            text-align: center;\n            font-size: 14px; }\n          .ims-install .content .container .login .login-form p {\n            text-align: center;\n            color: #4d4d4d;\n            font-size: 20px; }\n"]}]);

// Exports
exports.locals = {
	"ims-install": "ims-install",
	"imsInstall": "ims-install",
	"content": "content",
	"container": "container",
	"login": "login",
	"login-header": "login-header",
	"loginHeader": "login-header",
	"main-form": "main-form",
	"mainForm": "main-form",
	"login-form": "login-form",
	"loginForm": "login-form",
	"title": "title"
};

/***/ }),

/***/ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js */ "../node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".ims-setting .footer-bar {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-justify-content: space-between;\n          justify-content: space-between; }\n", "",{"version":3,"sources":["index.scss"],"names":[],"mappings":"AAAA;EACE,qBAAa;EAAb,aAAa;EACb,2BAAmB;UAAnB,mBAAmB;EACnB,sCAA8B;UAA9B,8BAA8B,EAAE","file":"index.scss","sourcesContent":[".ims-setting .footer-bar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n"]}]);

// Exports
exports.locals = {
	"ims-setting": "ims-setting",
	"imsSetting": "ims-setting",
	"footer-bar": "footer-bar",
	"footerBar": "footer-bar"
};

/***/ }),

/***/ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./index.scss */ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/bind/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js */ "../node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./index.scss */ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/finish/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js */ "../node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./index.scss */ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/info/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js */ "../node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./install.scss */ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/install.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js */ "../node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../node_modules/_style-loader@0.23.1@style-loader/index.js?!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/_style-loader@0.23.1@style-loader??ref--7-1!../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!/usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../../../../Volumes/work/node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../../../../../../../../../../../Volumes/work/node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--7-3!../../../../../../../../../../../Volumes/work/node_modules/_postcss-loader@3.0.0@postcss-loader/src??postcss!../../../../../../../../../../../Volumes/work/node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!./index.scss */ "../node_modules/_ims-typed-loader@1.0.2@ims-typed-loader/lib/type.js!../node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js?!../node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js!../../../usr/local/lib/node_modules/ims-cli/node_modules/_ims-addon-install@1.0.54@ims-addon-install/lib/template/admin/setting/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../../../../Volumes/work/node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js */ "../node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

}]);
//# sourceMappingURL=vendors~ims-addon-install_2da798d43b28316e4e8b.chunk.js.map