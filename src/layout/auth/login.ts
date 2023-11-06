import { Component, OnDestroy, OnInit, Signal, WritableSignal, computed, signal } from '@angular/core';
import { AccessTokenAccessor } from '../../features/api/token';
import { NgIf } from '@angular/common';
import { UserProvider } from './user';
import { GitUser } from '../../features';
import { Subscription, tap } from 'rxjs';

@Component({
  imports: [NgIf],
  standalone: true,
  selector: 'login',
  template: `
  <form *ngIf="!isAuthenticated else profiles" [action]="accessor.authUrl" method="POST">
    <input type="submit" value="Login" />
  </form>
  <ng-template #profiles>
    <p>{{ user()?.name }}</p>
  </ng-template>
  `
})
export class Login implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  user: WritableSignal<GitUser | null> = signal(null);
  get isAuthenticated(): boolean { return this.accessor.isAuthenticated; }

  constructor(public accessor: AccessTokenAccessor, private provider: UserProvider, private window: Window) {
    this.subscriptions = this.accessor.onAuthenticated.pipe(
      tap(() => this.provider.getUser().then(user => this.user.set(user)))
    ).subscribe();
  }
  ngOnInit(): void {
    if(this.accessor.isAuthenticated)
      this.provider.getUser().then(user => this.user.set(user));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
