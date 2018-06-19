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

    //TODO:不能重复
    var _this = _possibleConstructorReturn(this, (VehicleEditor.__proto__ || Object.getPrototypeOf(VehicleEditor)).call(this, props));

    var preStrategy = [{ regex: _recognizer.RegRule.vehicle.车牌, style: { color: "red" }
      // {
      //   regex: RegRule.vehicle.连号车牌,
      //   style: { borderBottom: "1px solid red" }
      // }
    }];
    _this.state = {
      editorState: _draftJs.EditorState.createEmpty((0, _draftExtension.CreateDecorator)("span", preStrategy)),
      infoState: { vehicle: [], ignoreVehicle: [] }
    }; //所有的车辆 //需要忽略的车辆

    _this.onChange = _this.onChange.bind(_this);
    _this.onClickInfoCtrl = _this.onClickInfoCtrl.bind(_this);
    _this.onExtraChange = _this.onExtraChange.bind(_this);
    return _this;
  }
  //外部方法


  _createClass(VehicleEditor, [{
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
      this.state.infoState.vehicle = (0, _recognizer.RegMatch)(editorState.getCurrentContent().getPlainText(), _recognizer.RegRule.vehicle.车牌, _recognizer.RegRule.vehicle.车架号).distinctConcat((0, _recognizer.LinkRegMatch)(editorState.getCurrentContent().getPlainText(), _recognizer.RegRule.vehicle.连号车牌));
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
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.string
};

exports.default = VehicleEditor;