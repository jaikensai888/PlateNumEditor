"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./style.css");

var _checkBlue = require("./images/check-blue.png");

var _checkBlue2 = _interopRequireDefault(_checkBlue);

var _checkGrep = require("./images/check-grep.png");

var _checkGrep2 = _interopRequireDefault(_checkGrep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function Tag(props) {
  return _react2.default.createElement(
    "div",
    {
      className: "RichEditor-tag",
      onClick: function onClick() {
        return props.onClick(!props.ignore);
      }
    },
    _react2.default.createElement(
      "span",
      { className: "RichEditor-span" },
      props.children
    ),
    _react2.default.createElement("img", { className: "RichEditor-img", src: props.ignore ? _checkGrep2.default : _checkBlue2.default })
  );
};

Tag.propTypes = {
  ignore: _propTypes2.default.bool,
  onClick: _propTypes2.default.func
};

exports.default = Tag;