export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isSubObject(obj1, obj2) {
  return Object.keys(obj2).every(key => {
    return obj1[key] === obj2[key];
  });
}
