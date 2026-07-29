import { Injectable, inject, signal } from '@angular/core';
import { CocktailService } from '../data/cocktail.service';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root',
})
export class CocktailListStateService {

  private readonly cocktailService = inject(CocktailService);
  private readonly _cocktails = signal<Cocktail[]>([]);
  private readonly _isLoading = signal(false);
  readonly cocktails = this._cocktails.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  async load(): Promise<void> {
    this._isLoading.set(true);
    const cocktails =
      await this.cocktailService.getCocktails();
    this._cocktails.set(cocktails);
    this._isLoading.set(false);
  }


  async reload(): Promise<void> {
    await this.load();
  }


  removeLocal(id: number): void {
    this._cocktails.update(
      cocktails =>
        cocktails.filter(cocktail => cocktail.id !== id)
    );
  }

}