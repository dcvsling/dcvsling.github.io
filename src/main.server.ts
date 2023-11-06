import { bootstrapApplication } from '@angular/platform-browser';
import { Shell } from './app/shell';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(Shell, config);

export default bootstrap;
