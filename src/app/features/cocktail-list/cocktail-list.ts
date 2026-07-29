import { Component, inject, OnInit } from '@angular/core';
import { CocktailListStateService } from '../cocktail-list-state.service';
import { CocktailCard } from '../cocktail-card/cocktail-card';
import { CocktailService } from '../../data/cocktail.service';

@Component({
  selector: 'app-cocktail-list',
  imports: [
    CocktailCard
  ],
  templateUrl: './cocktail-list.html',
  styleUrl: './cocktail-list.scss',
})
export class CocktailList implements OnInit {
  private readonly cocktailService =
    inject(CocktailService);
  private readonly state =
    inject(CocktailListStateService);


  cocktails = this.state.cocktails;

  isLoading = this.state.isLoading;


  async ngOnInit(): Promise<void> {

    await this.state.load();

  }
  async deleteCocktail(id: number): Promise<void> {

    await this.cocktailService.deleteCocktail(id);

    this.state.removeLocal(id);

  }

}