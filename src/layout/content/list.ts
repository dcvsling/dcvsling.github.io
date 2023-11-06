import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Directory, FSState, File } from '../../features';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { CreateLinkPipe } from './createlink.pipe';
import { ListItemCard } from './card';


@Component({
  selector: 'content-list',
  standalone: true,
  imports: [NgFor, RouterModule, CreateLinkPipe, ListItemCard],
  template: `
  <ul>
    <li *ngFor="let data of src()">
      <a [routerLink]="data | createLink" routerLinkActive="router-link-active">
        {{ data.fullname }}
        <!-- <content-card [src]="data"></content-card> -->
      </a>
    </li>
  </ul>`,
  styles: [`

    ul {
      /* padding: 0 10% 0 10%; */
      columns: 4;
    }
    li {
      /* padding: 0 0.2em 0 0.0.2em */
    }
  `]
})
export class ContentList {
  constructor(private route: ActivatedRoute, private fs: FSState) {
    this.route.paramMap.subscribe(async map => {
      if(!map.has('path'))
        return;
      const path = map.get('path');
      if(path?.trim()?.length === 0 ?? true)
        return;
      this.fs.findDir(path!)
        .then(async dir => dir.children)
        // .then(children => children.filter(child => child.type === 'file').map(val => val as File))
        .then(x => this.src.set(x));
    });
  }
  src: WritableSignal<(File | Directory)[]> = signal([]);
}
