import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export interface AnchorItem {
  level: string;
  name: string;
  content: string;
}

@Component({
  selector: 'anchor',
  imports: [NgFor, RouterModule],
  standalone: true,
  template: `
  <ul>
    <li *ngFor="let item of items">
      <a

        [class]="[createAnchorClass(item.level), 'anchor']"
        [href]="createAnchorUrl(item.name)">{{ item.content }}</a>
    </li>
  </ul>
  `,
  styles: [`
    .anchor-h1 { padding-left: 0 }
    .anchor-h2 { padding-left: 0.5em }
    .anchor-h3 { padding-left: 1em }
    .anchor-h4 { padding-left: 1.5em }
    .anchor-h5 { padding-left: 2em }
    .anchor-h6 { padding-left: 2.5em },
    .router-link-active {
      background-color: White;
    }
  `]
})
export class Anchor {
  @Input() items: AnchorItem[] = [];

  constructor(private router: Router) { }

  createAnchorUrl(path: string): string[] {
    return [this.router.url.split('#')[0]+`${path}`];
  }
  createAnchorClass(level: string) {
    return `anchor-h${level}`;
  }
}
