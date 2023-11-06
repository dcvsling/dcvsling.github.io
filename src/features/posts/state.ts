import { Injectable } from "@angular/core";
import { State } from "../state";
import { GitIssueStore } from "./store";
import { Defer, defer } from "../../utils";
import { PostTree } from "./post";

@Injectable({
  providedIn: 'root'
})
export class PostState extends State<string, PostTree> {
  constructor(private store: GitIssueStore, window: Window) {
    super(window);
  }
  getPostTree(issue_number: number): Defer<PostTree>;
  getPostTree(title: string): Defer<PostTree>;
  getPostTree(input: string | number): Defer<PostTree> {
    return typeof input === 'number'
      ? this.withIssueNumber(input)
      : this.withTitle(input);
  }
  private withIssueNumber(issue_number: number): Defer<PostTree> {
    return defer(async () => new PostTree(await this.store.get(issue_number + ''), this.store.getComments(issue_number)));
  }

  private withTitle(title: string): Defer<PostTree> {
    return defer(async () =>  this.store.getByTitle(title).then(issue => issue === undefined ? undefined : new PostTree(issue, this.store.getComments(issue.number))));
  }
}
