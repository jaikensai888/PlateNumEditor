"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tag = require("./tag");

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfoControl = function InfoControl(props) {
  var vehicle = props.infoState.vehicle;
  var ignoreVehicle = props.infoState.ignoreVehicle;
  return _react2.default.createElement(
    "div",
    { className: "RichEditor_InfoControl" },
    vehicle.map(function (item) {
      return _react2.default.createElement(
        _tag2.default,
        {
          ignore: ignoreVehicle.length > 0 && ignoreVehicle.includes(item),
          key: "tag_" + item,
          onClick: function onClick(toIgnore) {
            var actionName = toIgnore ? "ignoreVehicle" : "unIgnoreVehicle";
            props.onClick(actionName, item);
          }
        },
        item
      );
    })
  );
};

InfoControl.propTypes = {
  infoState: _propTypes2.default.object,
  onClick: _propTypes2.default.func
};

exports.default = InfoControl;