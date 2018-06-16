import { rule } from "postcss";

export const RegRule = {
  vehicle: {
    车牌:
      "[冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领]{1}[a-z]{1}[a-zA-Z0-9]{4}[a-zA-Z0-9挂学警港澳]{1}",
    车架号: "[L]{1}[a-zA-Z0-9]{16}"
  }
};

export const RegMatch = (value, ...ruleType) => {
  let result = [];
  if (!value) {
    return result;
  }
  ruleType.forEach(type => {
    let reg = new RegExp(type, "gim");
    let matcher = value.match(reg);
    if (matcher) {
      result = [...matcher, ...result];
    }
  });
  return result;
};
