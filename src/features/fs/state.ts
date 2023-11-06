import { GitTreeItemBlob, GitTreeItemTree } from './model.git';

import { Injectable } from "@angular/core";
import { State } from "../state";
import { Directory, File, GitContent, GitContentDir, GitContentFile, GitTreeItem  } from "./model";
import { Defer, defer } from "../../utils";
import { FileArgs, FileInfo } from "./file";
import { DirectoryInfo } from "./dir";
import { GitRepoStore } from "./store";
import { RepoQueryOptions } from './options';


@Injectable({
  providedIn: 'root'
})
export class FSState extends State<string, File | Directory | (File | Directory)[]> {
  constructor(private store: GitRepoStore, window: Window, private options: RepoQueryOptions) {
    super(window);
  }
  create(arg: GitContentFile): File;
  create(arg: GitTreeItemBlob, parentPath: string): File;
  create(arg: GitContentDir): Directory;
  create(arg: GitTreeItemTree, parentPath: string): Directory;
  create(arg: GitContent): File | Directory;
  create(arg: GitTreeItem, parentPath: string): File | Directory;
  create(arg: GitContent | GitTreeItem, parentPath?: string): File | Directory {
    const fs = arg.type === 'file' || arg.type === 'blob'
      ? FileInfo.create(arg, this, this.options, parentPath!)
      : arg.type === 'dir' || arg.type === 'tree'
        ? DirectoryInfo.create(arg, this, this.options, parentPath!)
        : undefined;
    if(!fs)
      throw Error('not support type: ' + arg.type);
    this.set(fs.fullname, fs);
    return fs;
  }
  findFile(path: string): Defer<File> {
    return defer(async () => {
      const result = this.get<File>(path);
      if(!!result)
        return result;
      return await this.createFileAsync(this.store, path);
    })
  }
  private async createFileAsync(store: GitRepoStore, path: string): Promise<File> {
    const content = await store.contents({ path });
    if(this.ensureSingleFileContent(path, content))
      return this.create(content);
    throw Error('fail to create file');
  }

  private ensureSingleFileContent(path: string, content: GitContent[] | GitContent): content is GitContentFile {
    if(Array.isArray(content))
      throw Error(`get multi contents, ${path} is not file path`);
    else if(content.type === 'dir')
      throw Error(`content type is dir`);
    return true;
  }
  findDir(path: string): Defer<Directory> {
    return defer(async () => {
      const result = this.get(path);
      if(!!result)
        return result instanceof Defer ? await result : result;
      return await defer(() => this.createDirAsync(this.store, path));
    });
  }

  private async createDirAsync(store: GitRepoStore, path: string): Promise<Directory> {
    const contents = await store.contents({ path: getParentPath(path) });
    if(this.ensureMultiContents(path, contents))
      return this.create(contents.find(c => c.path === path)!) as Directory;
    throw Error('fail to create dir');
    function getParentPath(path: string): string {
      const result = path.slice(0, path.lastIndexOf('/'));
      return result === '' ? '/' : result;
    }
  }

  private ensureMultiContents(path: string, content: GitContent[] | GitContent): content is GitContent[] {
    if(!Array.isArray(content))
      throw Error(`get single contents, ${path} is not dir path`);
    return true;
  }
  getContent(file: File): Defer<string> {
    return defer(() => this.store.blob({ file_sha: file.sha }).then(f => f.content));
  }
  link<T>(url: string): Defer<T> {
    return defer(() => this.store.link<T>(url));
  }
}

