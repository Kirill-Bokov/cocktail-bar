import { Injectable } from '@angular/core';
import { CocktailCreate } from '../models/coctail-create.model';
import { CocktailRepository } from '../data/cocktail.repository';
import { Cocktail } from '../models/cocktail.model';
import { DEFAULT_COCKTAILS } from './cocktail.seed';
import { CocktailInsert } from '../models/coctail-insert.model';


@Injectable({
    providedIn: 'root',
})

export class CocktailService {

    constructor(
        private readonly repository: CocktailRepository
    ) { }
    private initialized = false;
    async initialize(): Promise<void> {
        const cocktails = await this.repository.findAll();

        if (cocktails.length > 0) {
            return;
        }

        for (const cocktail of DEFAULT_COCKTAILS) {
            await this.createCocktail(cocktail);
        }
    }

    async getCocktails(): Promise<Cocktail[]> {

        if (!this.initialized) {
            await this.initialize();
            this.initialized = true;
        }

        return this.repository.findAll();
    }

    getCocktail(id: number): Promise<Cocktail | undefined> {
        return this.repository.findById(id);
    }

    createCocktail(
        cocktail: CocktailCreate
    ): Promise<number> {

        const now = new Date();

        const entity: CocktailInsert = {
            ...cocktail,
            createdAt: now,
            updatedAt: now,
        };

        return this.repository.create(entity);
    }

    updateCocktail(
        id: number,
        changes: Partial<Omit<Cocktail, 'id' | 'createdAt'>>
    ): Promise<number> {
        return this.repository.update(id, {
            ...changes,
            updatedAt: new Date(),
        });
    }

    deleteCocktail(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}