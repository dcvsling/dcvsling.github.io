
import { Defer } from "../../utils";
import { RepoQueryOptions } from "./options";

export * from './model.git';

export type UrlParam<T extends string, R extends string[] = []>
= T extends `${string}{${infer T}}${infer Other}`
  ? T['length'] extends 0
      ? UrlParam<Other, R>
      : UrlParam<Other, [T, ...R]>
  : R['length'] extends 0
      ? never
      : { [P in R[number]]: string };



export interface File {
  readonly sha: string;
  readonly type: 'file';
  readonly name: string;
  readonly path: string;
  readonly fullname: string;
  readonly content: Defer<string>;
}

export interface Directory {
  readonly sha: string;
  readonly type: 'dir';
  readonly path: string;
  readonly name: string;
  readonly fullname: string;
  readonly children:  Defer<(Directory | File)[]>;
}
export type FSArgs = { sha: string, path: string, type: 'blob' | 'file' | 'dir' | 'tree' };
export type QueryParam<T extends string> = Omit<UrlParam<T>, keyof RepoQueryOptions>;
