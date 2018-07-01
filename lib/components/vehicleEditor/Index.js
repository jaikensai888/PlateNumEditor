"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require("draft-js");

require("./style.css");

var _InfoControl = require("./InfoControl");

var _InfoControl2 = _interopRequireDefault(_InfoControl);

var _recognizer = require("../../lib/recognizer");

var _arrayExtension = require("../../lib/arrayExtension");

var _draftExtension = require("../../lib/draftExtension.decoratorFactory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {};

var VehicleEditor = function (_React$Component) {
  _inherits(VehicleEditor, _React$Component);

  function VehicleEditor(props) {
    _classCallCheck(this, VehicleEditor);

    var _this = _possibleConstructorReturn(this, (VehicleEditor.__proto__ || Object.getPrototypeOf(VehicleEditor)).call(this, props));

    _this.initRegRule = _this.initRegRule.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onClickInfoCtrl = _this.onClickInfoCtrl.bind(_this);
    _this.onExtraChange = _this.onExtraChange.bind(_this);

    _this.initRegRule();

    var me = _this;
    var defaultVehicle = _recognizer.RegMatch.apply(undefined, [props.defaultContent].concat(_toConsumableArray(me.regRule))).distinctConcat(props.recognizerConfig.连号车牌 ? (0, _recognizer.LinkRegMatch)(editorState.getCurrentContent().getPlainText(), _recognizer.RegRule.vehicle.连号车牌) : []);
    var defaultIgnoreVehicle = defaultVehicle.excludes(props.selectedVehicle);
    _this.state = {
      editorState: _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromText(props.defaultContent), (0, _draftExtension.CreateDecorator)("span", me.preStrategy)),
      infoState: {
        vehicle: defaultVehicle,
        ignoreVehicle: defaultIgnoreVehicle
      }
    }; //所有的车辆 //需要忽略的车辆
    return _this;
  }

  _createClass(VehicleEditor, [{
    key: "initRegRule",
    value: function initRegRule() {
      var me = this,
          config = this.props.recognizerConfig;
      me.preStrategy = [];
      me.regRule = [];
      for (var key in config) {
        if (config[key]) {
          if (!_recognizer.RegRule.vehicle[key]) {
            return;
          }
          var regex = _recognizer.RegRule.vehicle[key];
          me.regRule.push(regex);
          var reg = me.preStrategy.push({
            regex: regex,
            style: { color: "red" }
          });
        }
      }
    }
    //外部方法

  }, {
    key: "onExtraChange",
    value: function onExtraChange() {
      var me = this;
      var object = {
        getContent: function getContent() {
          return me.state.editorState.getCurrentContent().getPlainText();
        },
        getSelectedVehicle: function getSelectedVehicle() {
          return me.state.infoState.vehicle.excludes(me.state.infoState.ignoreVehicle);
        },
        getIgnoreVehicle: function getIgnoreVehicle() {
          return me.state.infoState.ignoreVehicle;
        },
        getVehicle: function getVehicle() {
          return me.state.infoState.vehicle;
        }
      };
      this.props.onChange(object);
    }
    //editor内容修改

  }, {
    key: "onChange",
    value: function onChange(editorState) {
      var me = this;
      this.state.infoState.vehicle = _recognizer.RegMatch.apply(undefined, [editorState.getCurrentContent().getPlainText()].concat(_toConsumableArray(me.regRule))).distinctConcat(me.props.recognizerConfig.连号车牌 ? (0, _recognizer.LinkRegMatch)(editorState.getCurrentContent().getPlainText(), _recognizer.RegRule.vehicle.连号车牌) : []);
      this.state.editorState = editorState;
      this.setState(this.state);
      this.onExtraChange();
    }
  }, {
    key: "onClickInfoCtrl",
    value: function onClickInfoCtrl(actionName, params) {
      switch (actionName) {
        case "ignoreVehicle":
          this.state.infoState.ignoreVehicle = [].concat(_toConsumableArray(this.state.infoState.ignoreVehicle), [params]);
          break;
        case "unIgnoreVehicle":
          var index = this.state.infoState.ignoreVehicle.findIndex(function (x) {
            return x == params;
          });
          this.state.infoState.ignoreVehicle.splice(index, 1);
          break;
        default:
          console.log(actionName + " handler is not define ");
          break;
      }
      this.setState(this.state);
      this.onExtraChange();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "RichEditor-root" },
        _react2.default.createElement(_InfoControl2.default, {
          infoState: this.state.infoState,
          onClick: this.onClickInfoCtrl
        }),
        _react2.default.createElement(
          "div",
          { className: "RichEditor-editor" },
          _react2.default.createElement(_draftJs.Editor, {
            editorState: this.state.editorState,
            onChange: this.onChange,
            placeholder: this.props.placeholder
          })
        )
      );
    }
  }]);

  return VehicleEditor;
}(_react2.default.Component);

VehicleEditor.propTypes = {
  selectedVehicle: _propTypes2.default.array,
  defaultContent: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string
};
VehicleEditor.defaultProps = {
  selectedVehicle: [],
  defaultContent: "",
  recognizerConfig: {
    车牌: true,
    车架号: true,
    新能源车牌: false,
    连号车牌: false
  }
};
exports.default = VehicleEditor;