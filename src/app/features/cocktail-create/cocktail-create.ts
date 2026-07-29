import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CocktailService } from '../../data/cocktail.service';
import { CocktailListStateService } from '../cocktail-list-state.service';
import { CocktailCreate as CocktailCreateModel } from '../../models/coctail-create.model';

type StepForm = FormGroup<{
  description: FormControl<string>;
  image: FormControl<Blob | null>;
}>;

@Component({
  selector: 'app-cocktail-create',
  imports: [ReactiveFormsModule],
  templateUrl: './cocktail-create.html',
  styleUrl: './cocktail-create.scss',
})
export class CocktailCreate {

  private readonly fb = inject(FormBuilder);
  private readonly cocktailService = inject(CocktailService);
  private readonly state = inject(CocktailListStateService);
  private readonly router = inject(Router);

  form = this.fb.group({
    name: this.fb.nonNullable.control(''),
    description: this.fb.nonNullable.control(''),
    steps: this.fb.array<StepForm>([]),
    image: this.fb.control<Blob | null>(null),
  });

  get steps() {
    return this.form.controls.steps;
  }

  private createStep(): StepForm {
    return this.fb.group({
      description: this.fb.nonNullable.control(''),
      image: this.fb.control<Blob | null>(null),
    });
  }

  addStep(): void {
    this.steps.push(this.createStep());
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  private mapFormToModel(): CocktailCreateModel {
    const value = this.form.getRawValue();

    return {
      name: value.name,
      description: value.description,
      steps: value.steps.map(step => ({
        description: step.description,
        image: step.image,
      })),
      image: value.image,
    };
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;

    await this.cocktailService.createCocktail(this.mapFormToModel());
    await this.state.reload();
    await this.router.navigate(['/cocktails']);

    this.form.reset();
    this.steps.clear();
  }

}