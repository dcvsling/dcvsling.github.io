import { Injectable } from "@angular/core";
import { AccessTokenAccessor } from "./token";

@Injectable({
  providedIn: 'root'
})
export class ApiClient {
  static host: string = 'https://api.github.com';
  constructor(private accessor: AccessTokenAccessor) { }
  get<T>(url: string): Promise<T> {
    return fetch(ApiClient.host + url, { method: 'GET', headers: this.getHeaders() })
      .catch(reason => { throw Error(reason); })
      .then(res => res.json());
  }

  sendRequest<T>(url: string, req: Parameters<typeof fetch>[1]): Promise<T> {
    return fetch(ApiClient.host + url, { headers: this.getHeaders(), ...req })
      .catch(reason => { throw Error(reason); })
      .then(res => res.json());
  }

  private getHeaders(): { [key: string]: string }  {
    return this.accessor.isAuthenticated
      ? { Authorization: `bearer ${this.accessor.get() as string}` }
      : {};
  }
}
