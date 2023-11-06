// import { InjectionToken, StaticProvider } from "@angular/core";
// import { Defer, defer } from "../../utils";
// import { File } from "./model";
// import { GitCommit, GitFileDiff } from "./model.git";
// import { GitStore } from "./store";
// import { FileInfo } from "./file";


// interface CommitOptions {
//   ref: string;
//   latest: number;
//   max: number;
// }

// const CommitOptions = new InjectionToken<CommitOptions>('commit options token');
// export { CommitOptions };
// export const COMMIT_OPTIONS_PROVIDER: StaticProvider = {
//   provide: CommitOptions,
//   useValue: { ref: 'heads/master', latest: 6, max: 6 }
// };
// export class CommitFilesProvider {
//   private _cache: File[] = [];
//   private _sha: string = '';
//   constructor(private store: GitStore, private options: CommitOptions) {}

//   getOrCreate(count?: number): Defer<File[]> {
//     const store = this.store;
//     const options = this.options;
//     const _cache = this._cache;
//     const _sha = this._sha;
//     const setSha = (sha: string) => this._sha = sha;
//     return defer(async () => this._cache ??= await checkToReload());

//     function loadHeadCommit(): Promise<GitCommit> {
//       return store.commit({ sha: 'heads/master' });
//     }
//     async function checkToReload(): Promise<File[]> {
//       const commit = (await loadHeadCommit());
//       const result = _sha === commit.sha ? _cache : reload(commit);
//       setSha(commit.sha);
//       return result;
//     }
//     async function reload(commit: GitCommit, loadedFiles: File[] = []): Promise<File[]> {
//       loadedFiles.push(...await commit2Files(store)(commit));
//       return loadedFiles.length <= Math.min(count ?? options.max, options.max)
//         ? reload(await loadParentCommit(commit), loadedFiles)
//         : loadedFiles;

//       function commit2Files(store: GitStore): (commit: GitCommit) => Promise<File[]> {
//         return c => Promise.all(c.file.map(createFileByDiff(store)));
//       }
//       function createFileByDiff(store: GitStore): (file: GitFileDiff) => Promise<File> {
//         return async file => new FileInfo(store, (await store.contents({ path: file.filename }))[0]);
//       }
//       async function loadParentCommit(commit: GitCommit): Promise<GitCommit> {
//         return (await fetch(commit.parents[0].url)).json().then(p => p as GitCommit);
//       }
//     }
//   }

// }


