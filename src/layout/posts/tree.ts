import { Component, Input, OnInit, Signal, WritableSignal, computed, signal } from '@angular/core';
import { GitIssueCommentStore, GitIssueComments, PostState, PostTree } from '../../features';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './post';
import { PostInput } from './input';
import { Defer } from '../../utils';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, FormsModule, PostComponent, PostInput ],
  selector: 'post-tree',
  template: `
  <post-input [store]="commentStore()"></post-input>
  <ul>
    <li *ngFor="let comment of comments | async">
      <post [src]="comment"></post>
    </li>
  </ul>
  `
})

export class PostTreeComponent {
  get comments(): Defer<GitIssueComments> | undefined { return this.tree()?.comments.all(); }
  tree: WritableSignal<PostTree | undefined> = signal(undefined);
  commentStore: Signal<GitIssueCommentStore | undefined> = computed(() => this.tree()?.comments);

  @Input() set title(title: string) {
    if(title?.length === 0 ?? true) return;
    this.provider.getPostTree(title)
      .then(tree => this.tree.set(tree));
  }
  constructor(private provider: PostState) { }

}
