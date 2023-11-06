import { Injectable } from "@angular/core";
import { JsonParser } from "./json";
@Injectable({ providedIn: 'root' })
export class Storage {
  private _storage: globalThis.Storage;
  constructor(private window: Window, private json: JsonParser) {
    this._storage = this.window.localStorage;
  }
  get<T>(key: string): T | undefined {
    return this.json.parse(this._storage.getItem(key)! ?? '{}');
  }

  set<T>(key: string, value: T) {
    this._storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this._storage.removeItem(key);
  }
  clear() {
    this._storage.clear();
  }
}

