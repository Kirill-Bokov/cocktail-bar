import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailList } from './cocktail-list';

describe('CocktailList', () => {
  let component: CocktailList;
  let fixture: ComponentFixture<CocktailList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailList],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
