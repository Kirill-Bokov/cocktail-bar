import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CocktailDatabase } from './data/cocktail.database';
import { db } from './data/app.database';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: CocktailDatabase,
      useValue: db,
    },
  ]
};
