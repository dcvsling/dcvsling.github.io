import { NgFor } from "@angular/common";
import { Component, WritableSignal, signal } from "@angular/core";
import { Directory, FSState } from "../features";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'topic',
  standalone: true,
  imports: [NgFor, RouterModule],
  template: `
  <span class="topics" *ngFor="let dir of root()">
    <a class="topic" routerLinkActive="topic-active" [routerLink]="['toc', dir.fullname].join('/')" >{{ dir.name }}</a>
  </span>`,
  styles: [`
    .topics {
      display: inline;
    }
    .topic-active {
      background-color: black;
      color: white;
      margin: 0;
      padding: 0;
    }
    .topics .topic {
      margin: 0;
      padding: 0 0.2em;
    }
  `]
})
export class Topic {
  root: WritableSignal<Directory[]> = signal([]);
  constructor(private fs: FSState) {
    this.fs.findDir('/')
      .then(dir => dir.children.then(children => children.filter(c => c.type === 'dir' && !c.name.startsWith('.')) as Directory[]))
      .then(x => this.root.set(x));
  };
}
