"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDecorator = CreateDecorator;

var _draftJs = require("draft-js");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//用法：
// const strategy = [
//   {
//     regex: RegRule.vehicle,
//     style: {color:'rgba(95, 184, 138, 1.0)}
//   }
// ];
//EditorState.createEmpty(CreateDecorator("span", preStrategy)),
function findWithRegex(regex, contentBlock, callback) {
  var text = contentBlock.getText();
  var matchArr = void 0,
      start = void 0;
  var reg = new RegExp(regex, "gim");
  while ((matchArr = reg.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function CreateDecorator(domType, strategy) {
  var option = [];
  strategy.forEach(function (element) {
    option.push({
      strategy: function strategy(contentBlock, callback) {
        findWithRegex(element.regex, contentBlock, callback);
      },
      component: function component(props) {
        return _react2.default.createElement(domType, { style: element.style }, props.children);
      }
    });
  });
  return new _draftJs.CompositeDecorator(option);
}