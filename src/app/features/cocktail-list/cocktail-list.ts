import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { CocktailListStateService } from '../cocktail-list-state.service';
import { CocktailCard } from '../cocktail-card/cocktail-card';

type SortType = 'nameAsc' | 'nameDesc' | 'dateDesc' | 'dateAsc' | 'stepsDesc' | 'stepsAsc';

@Component({
  selector: 'app-cocktail-list',
  imports: [
    CocktailCard,
    MatSelectModule
  ],
  templateUrl: './cocktail-list.html',
  styleUrl: './cocktail-list.scss',
})
export class CocktailList implements OnInit {

  private readonly state = inject(CocktailListStateService);

  readonly cocktails = this.state.cocktails;
  readonly isLoading = this.state.isLoading;

  readonly sortType = signal<SortType>('dateDesc');

  readonly sortedCocktails = computed(() => {

    const cocktails = [...this.cocktails()];

    switch (this.sortType()) {

      case 'nameAsc':
        return cocktails.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case 'nameDesc':
        return cocktails.sort((a, b) =>
          b.name.localeCompare(a.name)
        );

      case 'dateDesc':
        return cocktails.sort((a, b) =>
          b.createdAt.getTime() - a.createdAt.getTime()
        );

      case 'dateAsc':
        return cocktails.sort((a, b) =>
          a.createdAt.getTime() - b.createdAt.getTime()
        );

      case 'stepsDesc':
        return cocktails.sort((a, b) =>
          b.steps.length - a.steps.length
        );

      case 'stepsAsc':
        return cocktails.sort((a, b) =>
          a.steps.length - b.steps.length
        );

    }

  });


  async ngOnInit(): Promise<void> {
    await this.state.load();
  }

}