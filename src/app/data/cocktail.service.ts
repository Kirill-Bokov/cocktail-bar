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
    private mockImage?: Blob;

    private async getMockImage(): Promise<Blob> {
        if (!this.mockImage) {
            const response = await fetch('/mock.jpg');
            this.mockImage = await response.blob();
        }
        return this.mockImage;
    }

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

    async createCocktail(
    cocktail: CocktailCreate
): Promise<number> {

    const now = new Date();

    const preparedCocktail =
        await this.prepareImages(cocktail);

    const entity: CocktailInsert = {
        ...preparedCocktail,
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

    private async prepareImages(
    cocktail: CocktailCreate
): Promise<CocktailCreate> {

    const image = cocktail.image ??
        await this.getMockImage();

    return {
        ...cocktail,
        image,
        steps: cocktail.steps.map(step => ({
            ...step,
            image: step.image ?? image,
        })),
    };

}
}