import Dexie, { Table } from 'dexie';

import { Cocktail } from '../models/cocktail.model';

export class CocktailDatabase extends Dexie {

  public cocktails!: Table<Cocktail, number>;

  constructor() {
    super('CocktailDatabase');

    this.version(1).stores({
      cocktails: '++id, name, createdAt, updatedAt'
    });
  }

}