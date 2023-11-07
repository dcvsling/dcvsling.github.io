import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  template: `<p>not found</p>`
})
export class NotFound {
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.navigate([]);
  }
}
