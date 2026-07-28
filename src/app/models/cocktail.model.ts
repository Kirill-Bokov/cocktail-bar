import { CocktailCreate } from "./coctail-create.model";

export interface Cocktail extends CocktailCreate{
  id: number;
  createdAt: Date;
  updatedAt: Date;
}