import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { provideMarked } from './marked';
import markedHightlight from './hightlight.extensions';
import anchor from './anchor.extensions';

export const ContentMarked: InjectionToken<Marked> = provideMarked('marked for content', {}, markedHightlight, anchor);

@Injectable({
  providedIn: 'root'
})
export class MarkedContentProvider {
  constructor(@Inject(ContentMarked) private marked: Marked, private sanitizer: DomSanitizer) { }

  create(md: string): SafeHtml {
    const content = this.sanitizer.bypassSecurityTrustHtml(this.marked.parse(md));
    return content;
  }
}
