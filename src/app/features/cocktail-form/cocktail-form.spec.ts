import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailForm } from './cocktail-form';

describe('CocktailForm', () => {
  let component: CocktailForm;
  let fixture: ComponentFixture<CocktailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
