import { Injectable } from '@angular/core';

import { CocktailDatabase } from './cocktail.database';
import { Cocktail } from '../models/cocktail.model';
import { CocktailInsert } from '../models/coctail-insert.model';

@Injectable({
    providedIn: 'root',
})
export class CocktailRepository {

    constructor(
        private readonly db: CocktailDatabase
    ) {}

    findAll(): Promise<Cocktail[]> {
        return this.db.cocktails.toArray();
    }

    findById(id: number): Promise<Cocktail | undefined> {
        return this.db.cocktails.get(id);
    }

    create(cocktail: CocktailInsert): Promise<number> {
        return this.db.cocktails.add(cocktail as Cocktail);
    }

    update(
        id: number,
        changes: Partial<Omit<Cocktail, 'id' | 'createdAt'>>
    ): Promise<number> {
        return this.db.cocktails.update(id, changes);
    }

    delete(id: number): Promise<void> {
        return this.db.cocktails.delete(id);
    }
}