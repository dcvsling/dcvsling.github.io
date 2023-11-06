import { Injectable, InjectionToken } from "@angular/core";
import { FSState } from "./state";

export interface JsonParseReceiver {
  receive(key: string, value: any): any | void;
}
type JsonParseReceivers = JsonParseReceiver[];
const JsonParseReceivers = new InjectionToken<JsonParseReceivers>('json parse receivers');
export { JsonParseReceivers };

@Injectable()
export class FileSystemReceiver implements JsonParseReceiver {
  private typeNames = ['file', 'dir'];
  constructor(private state: FSState) { }
  receive(_: string, val: any): any | void {
    if(!!val
      && typeof val === 'object'
      && 'type' in val
      && this.typeNames.indexOf(val.type) >= 0)
      return this.state.create(val);
  }
}


@Injectable({
  providedIn: 'root'
})
export class JsonParser {
  constructor(private receivers: JsonParseReceivers) { }
  parse<T>(json: string): T {
    return JSON.parse(
      json,
      (key, value) => this.receivers.reduce(
        (val, receiver) => val ?? receiver.receive(key, value) ?? value,
        undefined));
  }
}

