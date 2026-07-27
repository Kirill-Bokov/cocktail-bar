import { Routes } from '@angular/router';

import { CocktailList } from './features/cocktail-list/cocktail-list';
import { CocktailDetails } from './features/cocktail-details/cocktail-details';
import { CocktailCreate } from './features/cocktail-create/cocktail-create';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cocktails',
    pathMatch: 'full',
  },

  {
    path: 'cocktails',
    component: CocktailList,
  },

  {
    path: 'cocktails/new',
    component: CocktailCreate,
  },

  {
    path: 'cocktails/:id',
    component: CocktailDetails,
  },

  {
    path: '**',
    redirectTo: 'cocktails',
  },
];
