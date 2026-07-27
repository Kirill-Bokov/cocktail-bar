import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCreate } from './cocktail-create';

describe('CocktailCreate', () => {
  let component: CocktailCreate;
  let fixture: ComponentFixture<CocktailCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
