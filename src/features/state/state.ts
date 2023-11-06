
import { Inject, PLATFORM_ID } from "@angular/core";
import { Defer } from "../../utils";
import { isPlatformBrowser } from "@angular/common";

export class State<TKey = any, TValue = any> implements Iterable<[TKey, TValue]> {
  private ks: TKey[] = [];
  private stack: [TKey, TValue][] = [];
  constructor(
    private window: Window,
    private comparer: (left: TKey, right: TKey) => boolean = (a,b) => a === b,
    seed: [TKey, TValue][] = []) {
    this.stack = seed;
    this.createKeys();
  }

  setName(name: string): void {
    (this.window as any)['state'] = { key: name, value: this };
    this.window.addEventListener('beforeunload', () => {
      if(this.stack.length > 0)
      {
        this.reduce();
        this.window.localStorage.setItem(name, JSON.stringify([...this]));
      }
      else
        window.localStorage.removeItem(name);
    });
  }

  private createKeys(): TKey[] {
    return this.ks = this.stack.group(x => x[0], this.comparer).map(x => x.key);
  }
  [Symbol.iterator](): Iterator<[TKey, TValue]> {
    return this.stack.group(x => x[0], this.comparer)
      .filter(x => x.values.length !== 0)
      .map(x => x.values.at(-1) as [TKey, TValue])
      .values();
  }
  get keys() {
    return this.ks;
  }
  has(key: TKey): boolean {
    return !!this.ks.find(k => this.comparer(key, k));
  }

  set(key: TKey, value: TValue): void {
    this.stack.push([key, value!]);
    if(this.ks.find(x => this.comparer(x, key)))
      this.ks.push(key);
  }

  get<T extends TValue>(key: TKey): T | undefined {
    return this.stack.filter(x => this.comparer(x[0], key)).at(-1)?.[1] as T;
  }
  clear() {
    this.stack = [];
    this.ks = [];
  }

  reduce() {
    const buffer: [TKey, TValue][] = [];
    const stack = this.stack;
    this.stack = buffer;
    this.ks = [];
    for(const item of stack.reverse()) {
      if(this.ks.contains(item[0]))
        continue
      buffer.push(item);
      this.ks.push(item[0]);
    }
  }
}

