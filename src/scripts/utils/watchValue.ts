/* ------------------------------
プロパティの監視
------------------------------ */

/*
  const obj = {
    name: 'hoge'
  };

  watchValue(obj, 'name', (value) => {
    console.log(value);
  });
*/

export const watchValue = (obj: { [x: string]: any; name?: string }, propertyName: string, callback: { (value: any): void }) => {
  let value = obj[propertyName];
  Object.defineProperty(obj, propertyName, {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      callback(newValue);
    },
  });
};
