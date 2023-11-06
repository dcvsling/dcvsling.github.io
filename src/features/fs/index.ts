import { FileSystemReceiver, JsonParseReceivers } from './json';
import { REPO_QUERY_DATA_PROVIDER } from './options';
export * from './file';
export * from './dir';
export * from './model';
export * from './options';
export * from './state';
export * from './storage';
export * from './store';
export * from './json';
export default [
  {
    provide: JsonParseReceivers,
    useClass: FileSystemReceiver,
    multi: true
  },
  REPO_QUERY_DATA_PROVIDER];
