"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ArrayExtension = true;
//除外
Array.prototype.excludes = function (distArray) {
  var srcArray = this,
      result = [];
  srcArray.forEach(function (element) {
    if (!distArray.includes(element)) {
      result.push(element);
    }
  });
  return result;
};
//去重合并
Array.prototype.distinctConcat = function (distArray) {
  var srcArray = this;
  return Array.from(new Set([].concat(_toConsumableArray(srcArray), _toConsumableArray(distArray))));
};

exports.default = ArrayExtension;