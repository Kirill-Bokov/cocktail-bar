import { Component, inject, OnInit } from '@angular/core';
import { CocktailListStateService } from '../cocktail-list-state.service';
import { CocktailCard } from '../cocktail-card/cocktail-card';


@Component({
  selector: 'app-cocktail-list',
  imports: [
    CocktailCard,
  ],
  templateUrl: './cocktail-list.html',
  styleUrl: './cocktail-list.scss',
})
export class CocktailList implements OnInit {

  private readonly state = inject(CocktailListStateService);

  readonly cocktails = this.state.cocktails;
  readonly isLoading = this.state.isLoading;


  async ngOnInit(): Promise<void> {

    await this.state.load();

  }

}