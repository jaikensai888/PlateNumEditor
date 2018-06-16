"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styleButton = require("./styleButton");

var _styleButton2 = _interopRequireDefault(_styleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionStyleControl = function ActionStyleControl(props) {
  var BLOCK_TYPES = [{ label: "识别", style: "recognize" }];
  var editorState = props.editorState;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  // console.log(blockType);

  return _react2.default.createElement(
    "div",
    { className: "RichEditor-controls" },
    BLOCK_TYPES.map(function (type) {
      return _react2.default.createElement(_styleButton2.default, {
        key: type.label,
        active: type.style === blockType,
        label: type.label,
        onToggle: props.onToggle,
        style: type.style
      });
    })
  );
};

ActionStyleControl.propTypes = {
  editorState: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
};

exports.default = ActionStyleControl;