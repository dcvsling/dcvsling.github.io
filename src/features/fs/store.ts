import { RepoQueryOptions } from './options';
import { defer, Defer } from "../../utils";
import { ApiClient, GitApi } from "../api";
import { GitBlob, GitCommit, GitContent, GitRef, GitTree, QueryParam } from "./model";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GitRepoStore {
  constructor(private options: RepoQueryOptions, private client: ApiClient) {}
  ref: Defer<GitRef> = defer(() => this.client.get(GitApi.REPO_REF({ ...{ ref: 'heads/master' }, ...this.options})));
  root(): Defer<GitTree> {
    return defer(async () => {
      const tree_sha = (await this.ref).object.sha;
      return await this.tree({ tree_sha });
    });
  }
  link<T>(url: string): Defer<T> {
    return defer(() => this.client.get<T>(url));
  }
  blob(param: QueryParam<typeof GitApi.REPO_BLOB_URL>): Defer<GitBlob> {
    return defer(() => this.client.get(GitApi.REPO_BLOB({...param, ...this.options})));
  }

  contents(param: QueryParam<typeof GitApi.REPO_CONTENTS_URL>): Defer<GitContent | GitContent[]> {
    return defer(() => this.client.get(GitApi.REPO_CONTENTS({...param, ...this.options})));
  }
  tree_recursive(param: QueryParam<typeof GitApi.REPO_TREE_RECURSIVE_URL>): Defer<GitTree> {
    return defer(() => this.client.get(GitApi.REPO_TREE_RECURSIVE({...param, ...this.options})));
  }
  tree(param: QueryParam<typeof GitApi.REPO_TREE_URL>): Defer<GitTree> {
    return defer(() => this.client.get(GitApi.REPO_TREE({...param, ...this.options})));
  }

  // commits(param: QueryParam<typeof GitApi.REPO_LAST_COMMITS_URL>): Defer<GitCommit[]> {
  //   return defer(() => this.client.get(GitApi.REPO_LAST_COMMITS({...param, ...this.options })));
  // }

  // commit(param: QueryParam<typeof GitApi.REPO_COMMIT_DETAIL_URL>): Defer<GitCommit> {
  //   return defer(() => this.client.get(GitApi.REPO_COMMIT_DETAIL({...param, ...this.options })));
  // }
}
