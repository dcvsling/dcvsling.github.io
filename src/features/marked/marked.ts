import { Marked, marked } from 'marked';
import { InjectionToken, StaticProvider } from "@angular/core";


export function provideMarked(
  name: string,
  options?: marked.MarkedOptions,
  ...extensions: marked.MarkedExtension[]): InjectionToken<Marked> {
  return new InjectionToken<Marked>(name, {
    providedIn: 'root',
    factory() {
      return new Marked(options ?? {}, ...extensions);
    }
  });
}
