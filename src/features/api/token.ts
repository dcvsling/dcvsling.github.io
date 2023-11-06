import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AccessTokenAccessor {
  private _token: string = '';
  constructor(private window: Window) {
    this._token = this.window.sessionStorage.getItem('access_token') ?? this._token ?? '';
  }
  get isAuthenticated(): boolean { return this._token.length > 0; }
  get authUrl(): string { return `https://auth.dcvs.idv.tw/github/auth?redirectUrl=` + location.pathname }

  get(): string | void {
    if(this._token.length > 0)
      return this._token;
    location.href = this.authUrl;
  }
  set(token: string): void {
    if(token.length === 0) return;
    this._token = token;
    window.sessionStorage.setItem('access_token', this._token);
    this.onAuthenticated.emit();
  }
  onAuthenticated: EventEmitter<void> = new EventEmitter<void>();
}
