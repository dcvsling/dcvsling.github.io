import { AccessTokenAccessor } from './../../features/api/token';


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  template: ''
})
export class Signin implements OnInit {
  constructor(private router: Router, private accessor: AccessTokenAccessor) { }

  ngOnInit() {
    if(location.search.length === 0) {
      this.router.navigate([]);
      return;
    }
    let redirectUrl: string = '';
    let accessToken: string = '';
    location.search.slice(1).split('&')
      .forEach(kvp => {
        const segments = kvp.split('=');
        switch(segments[0]) {
          case 'redirect_url':
            redirectUrl = decodeURIComponent(segments[1]);
            break;
          case 'access_token':
            accessToken = segments[1];
        }
      });
    this.accessor.set(accessToken);
    this.router.navigate(redirectUrl.split('/'));
  }
}
