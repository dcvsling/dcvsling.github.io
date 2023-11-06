import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import providers from '../providers';
import { ROUTES } from '@angular/router';
import { Shell } from './shell';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
        provide: ROUTES,
        multi: true,
        useValue: [
            {
                path: '',
                component: Shell
            }
        ]
    }
]
};

export const config = mergeApplicationConfig(providers, serverConfig);
