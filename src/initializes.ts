import { APP_INITIALIZER } from "@angular/core";
import { Directory, DirectoryRoot, FSState, File, GitRepoStore, Storage } from "./features";
import { Router } from "@angular/router";

export default [
  {
    provide: APP_INITIALIZER,
    useFactory(router: Router): () => Promise<void> {
      return async function(): Promise<void> {
        const [_, queryString]= router.url.split('?');
        if(!queryString || queryString.length === 0)
          return;
        const [[p, pv], [q, qv]] = queryString.split('&').map(kvp => kvp.split('='));
        if(p === 'p' && q === 'q')
          router.navigate(
            [pv.split('/')], {
              queryParams: qv.split('~and~')
                .map(qkp => qkp.split('='))
                .reduce((ctx, qkp) => {
                  ctx[qkp[0]] = qkp[1];
                  return ctx;
                },
              {} as { [key: string]: any }) });
      }
    },
    deps: [Router],
    multi: true
  },
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
