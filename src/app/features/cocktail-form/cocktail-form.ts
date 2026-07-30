import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cocktail } from '../../models/cocktail.model';
import { CocktailCreate as CocktailCreateModel } from '../../models/coctail-create.model';
import { FormMode } from '../../models/form-mode';
import { ImageValidationService } from '../../shared/image/image-validator-service';
import { ImageCompressionService } from '../../shared/image/image-compression-service';

type StepForm = FormGroup<{
  description: FormControl<string>;
  image: FormControl<Blob | null>;
}>;

@Component({
  selector: 'app-cocktail-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cocktail-form.html',
  styleUrl: './cocktail-form.scss',
})
export class CocktailForm implements OnChanges {

  private readonly fb = inject(FormBuilder);
  private readonly imageValidation = inject(ImageValidationService);
  private readonly imageCompression = inject(ImageCompressionService);

  @Input() mode: FormMode = 'create';
  @Input() cocktail?: Cocktail;

  @Output() submitted = new EventEmitter<CocktailCreateModel>();

  readonly form = this.fb.group({
    name: this.fb.nonNullable.control('', Validators.required),
    description: this.fb.nonNullable.control('', Validators.required),
    steps: this.fb.array<StepForm>([]),
    image: this.fb.control<Blob | null>(null),
  });

  get steps() {
    return this.form.controls.steps;
  }

  get title(): string {
    return this.mode === 'create' ? 'Создать коктейль' : 'Редактировать коктейль';
  }

  get submitText(): string {
    return this.mode === 'create' ? 'Создать' : 'Сохранить';
  }
  get nameError(): boolean {
    return this.form.controls.name.invalid && this.form.controls.name.touched;
  }

  get descriptionError(): boolean {
    return this.form.controls.description.invalid && this.form.controls.description.touched;
  }

  stepError(index: number): boolean {
    const step = this.steps.at(index);
    return step.controls.description.invalid && step.controls.description.touched;
  }

  get stepsError(): boolean {
    return this.steps.length === 0 && this.steps.touched;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cocktail'] && this.cocktail) this.fillForm(this.cocktail);
  }

  private createStep(description = '', image: Blob | null = null): StepForm {
    return this.fb.group({
      description: this.fb.nonNullable.control(description, Validators.required),
      image: this.fb.control<Blob | null>(image),
    });
  }

  addStep(): void {
    this.steps.push(this.createStep());
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  private fillForm(cocktail: Cocktail): void {
    this.form.patchValue({
      name: cocktail.name,
      description: cocktail.description,
      image: cocktail.image,
    });
    this.steps.clear();
    for (const step of cocktail.steps) {
      this.steps.push(this.createStep(step.description, step.image));
    }
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.steps.length === 0) return;
    const value = this.form.getRawValue();
    this.submitted.emit({
      name: value.name,
      description: value.description,
      image: value.image,
      steps: value.steps.map(step => ({
        description: step.description,
        image: step.image,
      })),
    });
  }

  async onImageSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!this.imageValidation.validateFile(file)) {
      alert('Недопустимый файл');
      return;
    }
    this.form.patchValue({
      image: await this.imageCompression.compress(file)
    });
  }

  async onStepImageSelected(event: Event, index: number): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!this.imageValidation.validateFile(file)) {
      alert('Недопустимый файл');
      return;
    }
    this.steps.at(index).patchValue({
      image: await this.imageCompression.compress(file)
    });
  }
}