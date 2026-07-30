import { Component, inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Cocktail } from '../../models/cocktail.model';
import { CocktailService } from '../../data/cocktail.service';
import { CocktailListStateService } from '../cocktail-list-state.service';
import { ImageUrlService } from '../../shared/image/image-url-service';


@Component({
  selector: 'app-cocktail-card',
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.scss',
})
export class CocktailCard implements OnChanges, OnDestroy {

  private readonly router = inject(Router);
  private readonly imageService = inject(ImageUrlService);

  private readonly cocktailService =
    inject(CocktailService);

  private readonly state =
    inject(CocktailListStateService);


  @Input()
  cocktail!: Cocktail;


  imageUrl: string | null = null;


  ngOnChanges(): void {

    this.clearImageUrl();

    this.imageUrl =
      this.imageService.createUrl(
        this.cocktail.image
      );

  }


  openDetails(): void {

    this.router.navigate([
      '/cocktails',
      this.cocktail.id
    ]);

  }


  edit(): void {

    this.router.navigate(
      [
        '/cocktails',
        this.cocktail.id
      ],
      {
        queryParams: {
          edit: true
        }
      }
    );

  }


  async delete(): Promise<void> {

    const confirmed =
      confirm(
        `Удалить коктейль "${this.cocktail.name}"?`
      );


    if (!confirmed) {
      return;
    }


    await this.cocktailService.deleteCocktail(
      this.cocktail.id
    );


    await this.state.reload();

  }


  private clearImageUrl(): void {

    if (this.imageUrl) {

      this.imageService.revokeUrl(
        this.imageUrl
      );

      this.imageUrl = null;

    }

  }


  ngOnDestroy(): void {

    this.clearImageUrl();

  }

}