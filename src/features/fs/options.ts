import { InjectionToken } from "@angular/core";

interface RepoQueryOptions {
  owner: string;
  repo: string;
}

const RepoQueryOptions = new InjectionToken<RepoQueryOptions>('repo query options');
export {RepoQueryOptions};
export const REPO_QUERY_DATA_PROVIDER = {
  provide: RepoQueryOptions,
  useValue: {
    owner: 'dcvsling',
    repo: 'theory'
  }
};


