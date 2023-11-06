
import { StaticProvider } from "@angular/core";
import { Meta, Head } from "./decorator";
import { SEOAccessor, SEOMetadata } from "./model";
type SEO = SEOMetadata & SEOAccessor;
class SEOBinder implements SEO {
  get(key: keyof SEOMetadata): string {
    return this[key];
  }
  set(key: keyof SEOMetadata, value: string): void {
    this[key] = value;
  }
  assign(metadata: SEOMetadata): void {
    if(!metadata) return;
    for(let key of Object.keys(metadata)) {
      if(key in this)
        (this as any)[key] = (metadata as any)[key];
    }
  }
  @Head('title') title: string = '';
  @Meta('description') description: string = '';
  @Meta('keywords') keywords: string = '';
  @Meta('author') author: string = '';
  @Meta('date') date: string = '';
  @Meta('lastModified') lastModified: string = '';
  @Meta('lastModifiedBy') lastModifiedBy: string = '';
  @Meta('created') created: string = '';
  @Meta('createdBy') createdBy: string = '';
}

const SEO: SEO = new SEOBinder();
export { SEO };
export const SEO_PROVIDER: StaticProvider = {
  provide: SEO,
  useValue: SEO
}
