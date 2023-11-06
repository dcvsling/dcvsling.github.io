import { Component, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GitIssueCommentStore } from '../../features';
@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'post-input',
  template: `
  <form class="inputPost">
    <textarea name="content"></textarea>
    <button type="submit" (submit)="submit()" (click)="submit()">submit</button>
  </form>`,
  styles: [`
    .inputPost {

    }
  `]
})
export class PostInput implements OnInit {
  @Input() store: GitIssueCommentStore | undefined;
  value: string = '';
  ngOnInit() {

  }
  submit() {
    this.store?.add({ body: this.value });
  }
}
