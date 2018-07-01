"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//使用该类需要
var RegRule = exports.RegRule = {
  vehicle: {
    车牌: "[冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领]{1}[a-z]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1}",
    车架号: "[L]{1}[a-zA-Z0-9]{16}",
    连号车牌: "[冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领]{1}[a-z]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1}([,，\\s]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1})+",
    新能源车牌: "[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))"
  }
};
//一般的正则匹配
var RegMatch = exports.RegMatch = function RegMatch(value) {
  for (var _len = arguments.length, ruleType = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    ruleType[_key - 1] = arguments[_key];
  }

  var result = [];
  if (!value || ruleType.length == 0) {
    return result;
  }
  ruleType.forEach(function (type) {
    var reg = new RegExp(type, "gim");
    var matcher = value.match(reg);
    if (matcher) {
      result = result.distinctConcat(matcher);
      console.debug("RegMatch", result);
    }
  });
  return result;
};

var LinkRegMatch = exports.LinkRegMatch = function LinkRegMatch(value) {
  for (var _len2 = arguments.length, ruleType = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    ruleType[_key2 - 1] = arguments[_key2];
  }

  var result = [];
  if (!value) {
    return result;
  }
  ruleType.forEach(function (type) {
    var reg = new RegExp(type, "gim");
    var matcher = value.match(reg);
    if (matcher) {
      matcher.forEach(function (item) {
        var matcher2 = item.split(new RegExp("[,，\\s]{1}", "gim"));
        var first = matcher2[0].substring(0, 2);
        var plateNumArray = matcher2.map(function (x) {
          if (x.indexOf(first)) {
            return x = first + x;
          }
          return x;
        });
        result = result.distinctConcat(plateNumArray);
      });
    }
  });
  console.debug("linkRegMatch", result);
  return result;
};