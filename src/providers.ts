import { EnvironmentProviders, PLATFORM_ID, Provider, importProvidersFrom, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_BASE_HREF, isPlatformBrowser } from "@angular/common";
import routes from './routes'
import features from './features';
import init from './initializes';
import { provideServiceWorker } from "@angular/service-worker";


class FakeStorage implements Storage {
  [name: string]: any;
  get length(): number { return 0; };
  clear(): void { }
  getItem(key: string): string | null { return null; }
  key(index: number): string | null { return null; }
  removeItem(key: string): void { }
  setItem(key: string, value: string): void { }
}


class FakeWindow extends Window {
  constructor() { super(); }
  override get localStorage(): Storage { return new FakeStorage(); }
  override get sessionStorage(): Storage { return new FakeStorage(); }
}


export default {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideRouter(routes),
    {
      provide: APP_BASE_HREF,
      useValue: "/"
    },
    {
      provide: Window,
      useFactory(id: object) {
        return isPlatformBrowser(id) ? window : new FakeWindow();
      },
      deps: [PLATFORM_ID]
    },
    ...features,
    ...init
  ] as Array<Provider | EnvironmentProviders>
};
