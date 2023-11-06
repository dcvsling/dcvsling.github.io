import { Shell } from './app/shell';
import { bootstrapApplication } from '@angular/platform-browser';
import providers from './providers';
import 'zone.js';

bootstrapApplication(Shell, providers).catch(console.error);
