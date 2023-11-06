import { FSArgs, File, GitBlob, GitContentFile, GitTreeItemBlob } from "./model";
import { Defer, defer } from "../../utils";
import { FSState } from "./state";
import { RepoQueryOptions } from "./options";
import { GitApi } from "../api";

export type FileArgs = FSArgs & { type: 'file' | 'blob', contentUrl: string };

export class FileInfo implements File {
  readonly type = "file";
  sha: string;
  name: string;
  path: string;
  content: Defer<string>;
  get fullname(): string { return [this.path === '' ? '' : `/${this.path}`, this.name].join('/'); }
  constructor(
    private state: FSState,
    private item: FileArgs
  ) {
    let segments = this.item.path.split('/');
    this.name = segments.pop()!;
    this.path = segments.join('/');
    this.sha = this.item.sha;
    this.content = defer<string>(async () => decodeURIComponent(escape(atob((await this.state.link<GitBlob>(this.item.contentUrl)).content.replace(/\s/g, '')))));
  }
  toJSON() {
    return this.item;
  }
  static create(content: Omit<FileArgs, 'contentUrl'>, state: FSState, options: RepoQueryOptions, basePath: string): File {
    return new FileInfo(
      state, {
        sha: content.sha,
        path: content.type === 'file' ? content.path : `${basePath === '/' ? '' : basePath.startsWith('/') ? basePath.slice(1) : basePath}/${content.path}`,
        type: 'file',
        contentUrl: GitApi.fillSlot(GitApi.REPO_BLOB_URL, { ...options, ...{ file_sha: content.sha } }) });
  }
}
