import { CocktailCreate } from "../models/coctail-create.model";

export const DEFAULT_COCKTAILS: CocktailCreate[] = [
  {
    name: 'Mojito',
    description: 'Освежающий кубинский коктейль с белым ромом, лаймом, мятой и содовой.',
    image: null,
    steps: [
      {
        description: 'Разомните листья мяты с тростниковым сахаром и соком лайма.',
        image: null,
      },
      {
        description: 'Добавьте белый ром и заполните бокал дроблёным льдом.',
        image: null,
      },
      {
        description: 'Долейте содовую и аккуратно перемешайте коктейльной ложкой.',
        image: null,
      },
    ],
  },
  {
    name: 'Margarita',
    description: 'Классический мексиканский коктейль из текилы, лайма и апельсинового ликёра.',
    image: null,
    steps: [
      {
        description: 'Охладите бокал и украсьте край солью.',
        image: null,
      },
      {
        description: 'Смешайте текилу, Triple Sec и свежий сок лайма в шейкере.',
        image: null,
      },
      {
        description: 'Процедите коктейль в бокал и подавайте охлаждённым.',
        image: null,
      },
    ],
  },
  {
    name: 'Old Fashioned',
    description: 'Классический крепкий коктейль на основе бурбона с биттером и сахаром.',
    image: null,
    steps: [
      {
        description: 'Растворите сахарный кубик с несколькими каплями Angostura.',
        image: null,
      },
      {
        description: 'Добавьте бурбон и крупный лёд.',
        image: null,
      },
      {
        description: 'Перемешайте и украсьте цедрой апельсина.',
        image: null,
      },
    ],
  },
  {
    name: 'Negroni',
    description: 'Итальянский аперитив с джином, Campari и красным вермутом.',
    image: null,
    steps: [
      {
        description: 'Соедините джин, Campari и сладкий вермут в стакане.',
        image: null,
      },
      {
        description: 'Добавьте крупный лёд и перемешайте.',
        image: null,
      },
      {
        description: 'Украсьте коктейль апельсиновой цедрой.',
        image: null,
      },
    ],
  },
  {
    name: 'Daiquiri',
    description: 'Минималистичный кубинский коктейль из рома, лайма и сахара.',
    image: null,
    steps: [
      {
        description: 'Добавьте в шейкер белый ром, сок лайма и сахарный сироп.',
        image: null,
      },
      {
        description: 'Встряхните смесь со льдом.',
        image: null,
      },
      {
        description: 'Процедите в охлаждённый коктейльный бокал.',
        image: null,
      },
    ],
  },
  {
    name: 'Cosmopolitan',
    description: 'Яркий коктейль с водкой, клюквенным соком и цитрусовыми нотами.',
    image: null,
    steps: [
      {
        description: 'Смешайте водку, апельсиновый ликёр, лайм и клюквенный сок.',
        image: null,
      },
      {
        description: 'Встряхните ингредиенты в шейкере со льдом.',
        image: null,
      },
      {
        description: 'Подавайте в охлаждённом бокале для мартини.',
        image: null,
      },
    ],
  },
  {
    name: 'Whiskey Sour',
    description: 'Баланс сладости, кислоты и крепости на основе американского виски.',
    image: null,
    steps: [
      {
        description: 'Смешайте виски, лимонный сок и сахарный сироп.',
        image: null,
      },
      {
        description: 'Добавьте белок яйца и встряхните без льда.',
        image: null,
      },
      {
        description: 'Добавьте лёд и повторно встряхните перед подачей.',
        image: null,
      },
    ],
  },
  {
    name: 'Moscow Mule',
    description: 'Освежающий коктейль из водки, имбирного пива и лайма.',
    image: null,
    steps: [
      {
        description: 'Наполните медную кружку льдом.',
        image: null,
      },
      {
        description: 'Добавьте водку и сок свежего лайма.',
        image: null,
      },
      {
        description: 'Долейте имбирное пиво и перемешайте.',
        image: null,
      },
    ],
  },
  {
    name: 'Pina Colada',
    description: 'Тропический коктейль с ромом, кокосом и ананасом.',
    image: null,
    steps: [
      {
        description: 'Смешайте ром, кокосовые сливки и ананасовый сок.',
        image: null,
      },
      {
        description: 'Взбейте ингредиенты со льдом до однородности.',
        image: null,
      },
      {
        description: 'Перелейте в высокий бокал и украсьте ананасом.',
        image: null,
      },
    ],
  },
  {
    name: 'Aperol Spritz',
    description: 'Лёгкий итальянский коктейль с игристым вином и Aperol.',
    image: null,
    steps: [
      {
        description: 'Наполните бокал большим количеством льда.',
        image: null,
      },
      {
        description: 'Добавьте Aperol и игристое вино Prosecco.',
        image: null,
      },
      {
        description: 'Долейте содовую и украсьте долькой апельсина.',
        image: null,
      },
    ],
  },
];