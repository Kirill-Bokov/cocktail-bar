import { CocktailCreate } from "../models/coctail-create.model";

export const DEFAULT_COCKTAILS: CocktailCreate[] = [
  {
    name: 'Mojito',
    description: 'Освежающий коктейль с мятой и лаймом',
    image: null,
    steps: [
      {
        description: 'Разомните мяту с сахаром и лаймом',
        image: null,
      },
      {
        description: 'Добавьте лёд и ром',
        image: null,
      },
    ],
  },
  {
    name: 'Margarita',
    description: 'Классический коктейль на основе текилы',
    image: null,
    steps: [
      {
        description: 'Смешайте текилу, сок лайма и ликёр',
        image: null,
      },
      {
        description: 'Подавайте охлаждённым',
        image: null,
      },
    ],
  },
];