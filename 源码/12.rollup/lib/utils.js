

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
function keys(obj) {
  return Object.keys(obj);
}
exports.hasOwnProperty = hasOwnProperty;
exports.keys = keys;