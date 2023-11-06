

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  author: string;
  date: string;
  lastModified?: string;
  lastModifiedBy?: string;
  created?: string;
  createdBy?: string;
}

export interface SEOAccessor {
  get(key: keyof SEOMetadata): string;
  set(key: keyof SEOMetadata, value: string): void;
  assign(metadata: SEOMetadata): void;
}
