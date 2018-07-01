//使用该类需要
export const RegRule = {
  vehicle: {
    车牌:
      "[冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领]{1}[a-z]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1}",
    车架号: "[L]{1}[a-zA-Z0-9]{16}",
    连号车牌:
      "[冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领]{1}[a-z]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1}([,，\\s]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1})+",
    新能源车牌:
      "[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))"
  }
};
//一般的正则匹配
export const RegMatch = (value, ...ruleType) => {
  let result = [];
  if (!value || ruleType.length == 0) {
    return result;
  }
  ruleType.forEach(type => {
    let reg = new RegExp(type, "gim");
    let matcher = value.match(reg);
    if (matcher) {
      result = result.distinctConcat(matcher);
      console.debug("RegMatch", result);
    }
  });
  return result;
};

export const LinkRegMatch = (value, ...ruleType) => {
  let result = [];
  if (!value) {
    return result;
  }
  ruleType.forEach(type => {
    let reg = new RegExp(type, "gim");
    let matcher = value.match(reg);
    if (matcher) {
      matcher.forEach(item => {
        let matcher2 = item.split(new RegExp("[,，\\s]{1}", "gim"));
        let first = matcher2[0].substring(0, 2);
        let plateNumArray = matcher2.map(x => {
          if (x.indexOf(first)) {
            return (x = first + x);
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
