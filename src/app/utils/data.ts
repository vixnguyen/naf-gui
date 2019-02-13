export function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function isEmpty(obj: any) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}
