
import { Defer, defer } from "../../utils";
import { GitApi } from "../api";
import { Directory, FSArgs, File, GitContentDir, GitTree, GitTreeItemTree } from "./model";
import { RepoQueryOptions } from "./options";
import { FSState } from "./state";

export type DirArgs = FSArgs & { type: 'dir' | 'tree', childrenUrl: string }

export class DirectoryInfo implements Directory {
  readonly type: 'dir' = 'dir';
  private _children: Defer<(Directory | File)[]> | undefined = undefined;
  get children(): Defer<(Directory | File)[]> {
    return this._children ??= this.createChildren();
  }
  sha: string;
  path: string;
  name: string;
  get fullname(): string { return [this.path === '' ? '' : `/${this.path}`, this.name].join('/'); }
  constructor(private item: DirArgs, private state: FSState) {
    this.sha = this.item.sha;
    let segments = this.item.path.split('/');
    this.name =  segments.pop()!;
    this.path = segments.join('/');
  }

  private createChildren(): Defer<(File | Directory)[]> {
    return defer(async () => (await this.state.link<GitTree>(this.item.childrenUrl))
        .tree
        .map(item => this.state.create(item, this.fullname)));
  }
  toJSON() {
    return this.item;
  }
  static create(content: Omit<DirArgs, 'childrenUrl'>, state: FSState, options: RepoQueryOptions, basePath: string): Directory {
    return new DirectoryInfo({
        path: content.type === 'dir' ? content.path : `${basePath === '/' ? '' : basePath.startsWith('/') ? basePath.slice(1) : basePath}/${content.path}`,
        sha: content.sha,
        type: 'dir',
        childrenUrl: GitApi.fillSlot(GitApi.REPO_TREE_URL, { ...options, ...{ tree_sha: content.sha } })
      }, state);
  }
}

export class DirectoryRoot implements Directory {
  type: 'dir' = 'dir';
  path: string = '';
  name: string = '';
  get fullname(): string { return [this.path, this.name].join('/'); }
  children: Defer<(File | Directory)[]>;
  constructor(
    public sha: string,
    children: (Directory | File)[]
  ) {
    this.children = Defer.resolve(children);
  }
}
