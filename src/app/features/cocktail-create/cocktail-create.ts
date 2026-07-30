import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CocktailService } from '../../data/cocktail.service';
import { CocktailListStateService } from '../cocktail-list-state.service';

import { CocktailCreate as CocktailCreateModel } from '../../models/coctail-create.model';

import { CocktailForm } from '../cocktail-form/cocktail-form';


@Component({
  selector: 'app-cocktail-create',
  imports: [CocktailForm],
  templateUrl: './cocktail-create.html',
  styleUrl: './cocktail-create.scss',
})
export class CocktailCreate {

  private readonly cocktailService = inject(CocktailService);
  private readonly state = inject(CocktailListStateService);
  private readonly router = inject(Router);


  async create(cocktail: CocktailCreateModel): Promise<void> {

    await this.cocktailService.createCocktail(cocktail);

    await this.state.reload();

    await this.router.navigate(['/cocktails']);

  }

}