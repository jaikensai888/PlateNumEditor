const ArrayExtension = true;
Array.prototype.excludes = function(distArray) {
  let scrArray = this,
    result = [];
  scrArray.forEach(element => {
    if (!distArray.includes(element)) {
      result.push(element);
    }
  });
  return result;
};

export default ArrayExtension;
