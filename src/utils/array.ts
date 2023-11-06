declare global {
  interface ArrayConstructor {
      repeat<T>(factory: (index: number) => T, count: number): T[];
      range(length: number, start: number): number[];
      range(length: number): number[];
  }
  interface Array<T> {
      remove(t: T): void;
      distinct(): Array<T>;
      distinct(compare?: Compare<T>): Array<T>;
      contains(t: T): boolean;
      contains(t: T, compare?: Compare<T>): boolean;
      group<TKey>(getKey: (t: T) => TKey): Array<Group<T, TKey>>;
      group<TKey>(getKey: (t: T) => TKey, compare: (left: TKey, right: TKey) => boolean): Array<Group<T, TKey>>;
  }
}

export type Compare<T> = (left: T, right: T)=> boolean;
export const Compare: Compare<any> = (left, right) => left === right;
export type Group<T, TKey> = { key: TKey, values: Array<T> };

Array.repeat = function<T>(factory: (index: number) => T, count: number): T[] {
  return Array.range(count).map(factory);
}

Array.range = function(length: number, start: number = 0): number[] {
  var result: number[] = [];
  while(length-- > 0) { result.push(start++); }
  return result;
}

Array.prototype.distinct = function<T>(this: Array<T>, compare?: Compare<T>): Array<T> {
  compare ??= ((x, y) => x === y);
  return this.reduce(reducer, []);
  function reducer(result: Array<T>, current: T): Array<T> {
      if(!result.find(x => _compare(x, current))) {
          result.push(current);
      }
      return result;
  }
  function _compare(x: T, y: T): boolean {
      return compare!(x, y);
  }
}

Array.prototype.contains = function<T>(this: Array<T>, t: T, compare?: Compare<T>): boolean {
  const _compare = compare ?? Compare;
  return !!this.find(x => _compare(x, t));
}

Array.prototype.group = function<T, TKey>(this: Array<T>, getKey: (t: T) => TKey, compare?: Compare<TKey>):  Group<T, TKey>[] {
  const _compare: Compare<TKey> = compare ?? Compare;
  const keys: TKey[] = [];
  return this.reduce<Group<T, TKey>[]>((result, value) => {
      const key = getKey(value);
      if(!keys.contains(key, _compare)) {
          keys.push(key);
          result.push({ key, values: [value] });
      } else {
          result.find(x => _compare(x.key, key))?.values.push(value);
      }
      return result;
  }, []);
}

Array.prototype.remove = function<T>(this: Array<T>, t: T): void {
  const index = this.indexOf(t);
  if(index >= 0)
      this.splice(index, 1);
}
