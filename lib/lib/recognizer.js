"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegMatch = exports.RegRule = undefined;

var _postcss = require("postcss");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var RegRule = exports.RegRule = {
  vehicle: {
    车牌: "[冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领]{1}[a-z]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1}",
    车架号: "[L]{1}[a-zA-Z0-9]{16}"
  }
};

var RegMatch = exports.RegMatch = function RegMatch(value) {
  for (var _len = arguments.length, ruleType = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    ruleType[_key - 1] = arguments[_key];
  }

  var result = [];
  if (!value) {
    return result;
  }
  ruleType.forEach(function (type) {
    var reg = new RegExp(type, "gim");
    var matcher = value.match(reg);
    if (matcher) {
      result = [].concat(_toConsumableArray(matcher), _toConsumableArray(result));
    }
  });
  return result;
};