import { CocktailCreate } from "./coctail-create.model";

export interface CocktailInsert extends CocktailCreate {
    createdAt: Date;
    updatedAt: Date;
}