import { APP_INITIALIZER } from "@angular/core";
import { Directory, DirectoryRoot, FSState, File, GitRepoStore, Storage } from "./features";

export default [
  {
    provide: APP_INITIALIZER,
    useFactory(store: GitRepoStore, fs: FSState, storage: Storage): () => Promise<void> {
      return async function(): Promise<void> {
        const key = (await store.ref).object.sha;
        const cache = storage.get<[string, File | Directory][]>(key);
        fs.setName(key);
        Array.isArray(cache) && cache.length > 0
          ? cache.forEach(x => fs.set(...x))
          : fs.set('/', new DirectoryRoot(key, await store.contents({path:'/'}).then(cs => (Array.isArray(cs) ? cs : [cs] ).map(c => fs.create(c)))));
      }
    },
    deps: [GitRepoStore, FSState, Storage],
    multi: true
  }
]
