import { GitIssue } from "./models";
import { GitIssueCommentStore } from "./store";

export class PostTree {
  get issue_number(): number { return this.issue.number; }
  get title(): string { return this.issue.title; }
  constructor(
    public issue: GitIssue,
    public comments: GitIssueCommentStore) {
  }
  toJSON() {
    return {
      issue_number: this.issue_number,
      title: this.title
    }
  }
}
