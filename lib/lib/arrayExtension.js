"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ArrayExtension = true;
Array.prototype.excludes = function (distArray) {
  var scrArray = this,
      result = [];
  scrArray.forEach(function (element) {
    if (!distArray.includes(element)) {
      result.push(element);
    }
  });
  return result;
};

exports.default = ArrayExtension;