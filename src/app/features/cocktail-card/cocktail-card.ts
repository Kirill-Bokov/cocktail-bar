import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { Cocktail } from '../../models/cocktail.model';


@Component({
  selector: 'app-cocktail-card',
  imports: [
    DatePipe
  ],
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.scss',
})
export class CocktailCard {

  @Input()
  cocktail!: Cocktail;


  @Output()
  deleted = new EventEmitter<number>();


  delete(): void {

    this.deleted.emit(
      this.cocktail.id
    );

  }

}