
import { Component, EventEmitter, OnDestroy, Output, Signal, WritableSignal, computed, signal } from '@angular/core';
import { MarkedContentProvider, SEOMetadata, FSState, MetadataProvider } from '../../features';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SEO } from '../../features';
import { PostTreeComponent } from '../posts';
import { Subscription } from 'rxjs';
import { Anchor, AnchorItem } from './anchor';

@Component({
  selector: 'content',
  imports: [CommonModule, RouterModule, PostTreeComponent, Anchor],
  standalone: true,
  template: `
    <div class="content">
      <section [innerHTML]="raw()"></section>
      <anchor [items]="anchor()"></anchor>
    </div>
    <hr />
    <post-tree [title]="title()!"></post-tree>
  `,
  styles: [`

    .content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      & section, anchor {
        display: inline-grid;
      }
    }
    post-tree {
      text-align: center;
      grid-column-start: 1;
      grid-column-end: 4;
    }
    section {

      grid-column-start: 1;
      grid-column-end: 4;
    }
    anchor {
      grid-column-start: 4;
      grid-column-end: 4;
    }
  `]
})
export class Content implements OnDestroy {
  @Output('content') contentChange: EventEmitter<SafeHtml> = new EventEmitter<SafeHtml>();
  raw: Signal<SafeHtml> = computed(() => this.contentProvider.create(this.content?.() ?? ''));
  title: Signal<string | undefined> = computed(() => this.metadata?.()?.title ?? '');
  content: WritableSignal<string> = signal('');
  metadata: Signal<SEOMetadata | undefined> = computed(() => {
    const metadata = this.metadataProvider.create<SEOMetadata>(this.content?.() ?? '');
    this.seo.assign(metadata);
    return metadata;
  });
  anchor: Signal<AnchorItem[]> = computed(() => {
    const result: AnchorItem[] = [];
    const div = document.createElement('div');
    div.innerHTML = this.raw() as string;
    div.querySelectorAll('h1, h2, h3, h4, h5, h6')
      .forEach(el => {
        const a = el.getElementsByTagName('a')[0];
        result.push({
          level: el.tagName.slice(1),
          name: a.getAttribute('href') ?? '',
          content: a.getAttribute('name') ?? ''
        })
      });
    return result;
  });
  private _subscriptions: Subscription;
  constructor(
    private route: ActivatedRoute,
    private fs: FSState,
    private contentProvider: MarkedContentProvider,
    private metadataProvider: MetadataProvider,
    private seo: SEO) {
    this._subscriptions = this.route.paramMap.subscribe(async map => {
      if(!map.has('path'))
        return;
      const path = map.get('path');
      if(path?.trim()?.length === 0 ?? true)
        return;
      this.fs.findFile(path!)
        .then(file => file.content)
        .then(content => this.content.set(content));
    }, console.error, () => this._subscriptions.unsubscribe());
  }
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
