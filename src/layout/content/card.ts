import { Component, Input, WritableSignal, signal } from '@angular/core';
import { File, MarkedContentProvider, SEOMetadata } from '../../features';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MetadataProvider } from '../../features';
@Component({
  standalone: true,
  selector: 'content-card',
  imports: [RouterModule, NgIf],
  template: `
  <p *ngIf="metadata() === {}; else card">{{ display }}</p>
  <ng-template #card>
    <div class="card">
      <div class="card-title">{{ metadata().title }}</div>
      <div class="card-content">{{ metadata().description }}</div>
      <div class="card-tag">{{ metadata().keywords }}</div>
    </div>
  </ng-template>
  `
})
export class ListItemCard {
  metadata: WritableSignal<Partial<SEOMetadata>> = signal({});
  display: string = '';
  file: File | null = null;
  @Input('src') set path(file: File | undefined) {
    if(!file) return;
    this.file = file;
    this.display = file.fullname;
    file.content
      ?.then(content => this.metadataProvider.create<SEOMetadata>(content))
      .then(meta => this.metadata.set(meta));
  }
  constructor(private metadataProvider: MetadataProvider) {}
}
