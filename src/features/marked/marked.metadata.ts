import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Marked } from "marked";
import yaml from 'js-yaml';
import metadata from './metadata.extensions';
import { provideMarked } from "./marked";

export const MetadataMarked: InjectionToken<Marked> = provideMarked('marked for metadata', {}, metadata);


@Injectable({
  providedIn: 'root'
})
export class MetadataProvider {
  constructor(@Inject(MetadataMarked) private marked: Marked) {}

  create<T>(markdown: string): T {
    return yaml.load(this.marked.parse(markdown)) as T;
  }
}
