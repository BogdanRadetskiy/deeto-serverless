export function enumToObject(enumObj) {
  const result = [];

  Object.keys(enumObj).forEach((element, key) => {
    const newObject = {
      title: enumObj[element],
      value: element,
      selected: false,
      default: false,
    };
    result.push(newObject);
  });

  return result;
}
