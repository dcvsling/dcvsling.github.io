import { Injectable } from '@angular/core';
import { ApiClient, GitApi, GitUser } from '../../features';
import { Defer, defer } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class UserProvider {
  constructor(private client: ApiClient) {}
  getUser(): Defer<GitUser> {
    return defer(() => this.client.get<GitUser>(GitApi.USER(null as never)));
  }
}
