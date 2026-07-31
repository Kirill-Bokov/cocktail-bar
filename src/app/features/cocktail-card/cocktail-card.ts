import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { Router } from '@angular/router';

import { Cocktail } from '../../models/cocktail.model';
import { CocktailService } from '../../data/cocktail.service';
import { CocktailListStateService } from '../cocktail-list-state.service';
import { ImageUrlService } from '../../shared/image/image-url-service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.scss'
})
export class CocktailCard implements OnChanges, OnDestroy {

  private readonly router = inject(Router);
  private readonly imageService = inject(ImageUrlService);
  private readonly cocktailService = inject(CocktailService);
  private readonly state = inject(CocktailListStateService);


  @Input({ required: true })
  cocktail!: Cocktail;


  imageUrl: string | null = null;


  ngOnChanges(changes: SimpleChanges): void {

    this.clearImageUrl();

    if (!this.cocktail?.image) {
      return;
    }

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

    if (!confirm(`Удалить "${this.cocktail.name}"?`)) {
      return;
    }

    await this.cocktailService.deleteCocktail(
      this.cocktail.id
    );

    await this.state.reload();

  }


  private clearImageUrl(): void {

    if (!this.imageUrl) {
      return;
    }

    this.imageService.revokeUrl(
      this.imageUrl
    );

    this.imageUrl = null;

  }


  ngOnDestroy(): void {

    this.clearImageUrl();

  }

}