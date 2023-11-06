import { Injectable } from "@angular/core";
import { ApiClient, GitApi } from "../api";
import { RepoQueryOptions } from "../fs";
import { Defer, defer } from "../../utils";
import { GitIssue, GitIssueAdd, GitIssueCommentAdd, GitIssueCommentRemove, GitIssueCommentUpdate, GitIssueComments, GitIssueUpdate, GitIssues } from "./models";

export class GitIssueCommentStore {
  constructor(
    private client: ApiClient,
    private options: RepoQueryOptions,
    public issueNumber: number) { }

    all(): Defer<GitIssueComments> {
      return defer(() => this.client.get(GitApi.ISSUE_COMMENTS_WITH_NUMBER({ ...this.options, issue_number: this.issueNumber + '' })))
    }
    add(data: GitIssueCommentAdd): Defer<void> {
      return defer(() => this.client.sendRequest(GitApi.ISSUE_COMMENTS_WITH_NUMBER({ ...this.options, issue_number: this.issueNumber + '' }), { method: 'POST', ...data }));
    }

    update(data: GitIssueCommentUpdate) {
      return defer(() => this.client.sendRequest(GitApi.ISSUE({...this.options, issue_number: this.issueNumber + ''}), { method: 'PATCH',  ...data }));
    }

    remove(comment_id: string) {
      return defer(() => this.client.sendRequest(GitApi.ISSUE_COMMENTS_WITH_ID({ ...this.options, comment_id }), { method: 'DELETE' }));
    }
}


@Injectable({
  providedIn: 'root'
})
export class GitIssueStore {
  constructor(private client: ApiClient, private options: RepoQueryOptions) { }

  get(issue_number: string): Defer<GitIssue> {
    return defer(() => this.client.get<GitIssue>(GitApi.ISSUE({ ...this.options, issue_number })));
  }

  getComments(issue_number: number): GitIssueCommentStore {
    return new GitIssueCommentStore(this.client, this.options, issue_number);
  }
  getByTitle(title: string): Defer<GitIssue> {
    return defer(() => this.client.get<GitIssues>(GitApi.ISSUES(this.options)).then(res => res.find(issue => issue.title === title)));
  }


}
