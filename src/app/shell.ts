import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login, Topic } from '../layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Topic, RouterModule, Login],
  template: `
  <div class="layout">
    <header>
      <i class="logo material-icons" (click)="router.navigate(['/'])">home</i>
      <topic></topic>
      <login></login>
    </header>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    <!-- <footer>footer</footer> -->
  </div>
  `,
  styles: [`
    header {
      position: sticky;
      top: 0;
      width: 100%;
    }
    footer {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    .layout {
      height: 100vh;
    }
    .content {
      position: relative;
      height: 92vh;
    }
    login {
      float: right;
    }

  `]
})
export class Shell {
  constructor(public router: Router){}
}


