const ArrayExtension = true;
//除外
Array.prototype.excludes = function(distArray) {
  let srcArray = this,
    result = [];
  srcArray.forEach(element => {
    if (!distArray.includes(element)) {
      result.push(element);
    }
  });
  return result;
};
//去重合并
Array.prototype.distinctConcat = function(distArray) {
  let srcArray = this;
  return Array.from(new Set([...srcArray, ...distArray]));
};

export default ArrayExtension;
