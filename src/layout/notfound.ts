import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  template: `<p>not found</p>`
})
export class NotFound {
  constructor(private router: Router) { }
  ngOnInit(): void {
    const [_, queryString]= this.router.url.split('?');
    if(!queryString || queryString.length === 0)
      this.router.navigate([]);
    const [[p, pv], [q, qv]] = queryString.split('&').map(kvp => kvp.split('='));
    if(p === 'p' && q === 'q')
      this.router.navigate(
        [pv.split('/')], {
          queryParams: qv.split('~and~')
            .map(qkp => qkp.split('='))
            .reduce((ctx, qkp) => {
              ctx[qkp[0]] = qkp[1];
              return ctx;
            },
          {} as { [key: string]: any }) });
  }
}
