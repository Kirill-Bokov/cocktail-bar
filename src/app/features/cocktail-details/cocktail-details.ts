import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from '../../data/cocktail.service';
import { CocktailListStateService } from '../cocktail-list-state.service';
import { Cocktail } from '../../models/cocktail.model';
import { CocktailCreate } from '../../models/coctail-create.model';
import { ImageUrlService } from '../../shared/image/image-url-service';
import { CocktailForm } from '../cocktail-form/cocktail-form';
import { OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-cocktail-details',
  imports: [
    CocktailForm,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './cocktail-details.html',
  styleUrl: './cocktail-details.scss',
})
export class CocktailDetails implements OnDestroy {

  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly cocktailService =
    inject(CocktailService);

  private readonly state =
    inject(CocktailListStateService);

  private readonly imageService =
    inject(ImageUrlService);


  readonly cocktail =
    signal<Cocktail | null>(null);


  readonly editing =
    signal(false);


  imageUrl: string | null = null;
  stepImageUrls: string[] = [];


  async ngOnInit(): Promise<void> {

    await this.loadCocktail();

  }
  private clearStepImageUrls(): void {

    for (const url of this.stepImageUrls) {
      this.imageService.revokeUrl(url);
    }

    this.stepImageUrls = [];

  }

  private updateStepImageUrls(cocktail: Cocktail): void {

    this.clearStepImageUrls();

    this.stepImageUrls = cocktail.steps
      .map(step => this.imageService.createUrl(step.image))
      .filter((url): url is string => url !== null);

  }
  private async loadCocktail(): Promise<void> {


    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );


    const cocktail =
      await this.cocktailService.getCocktail(id);



    if (!cocktail) {

      await this.router.navigate([
        '/cocktails'
      ]);

      return;

    }


    this.updateImageUrl(cocktail);
    this.updateStepImageUrls(cocktail);

    this.cocktail.set(cocktail);


    if (
      this.route.snapshot.queryParamMap.get('edit')
      === 'true'
    ) {

      this.editing.set(true);

    }

  }



  private updateImageUrl(
    cocktail: Cocktail
  ): void {


    this.clearImageUrl();


    this.imageUrl =
      this.imageService.createUrl(
        cocktail.image
      );

  }



  private clearImageUrl(): void {

    if (this.imageUrl) {

      this.imageService.revokeUrl(
        this.imageUrl
      );

      this.imageUrl = null;

    }

  }



  enableEditing(): void {

    this.editing.set(true);

  }



  cancelEditing(): void {

    this.editing.set(false);

  }



  async save(
    changes: CocktailCreate
  ): Promise<void> {


    const cocktail =
      this.cocktail();


    if (!cocktail) return;



    await this.cocktailService.updateCocktail(
      cocktail.id,
      changes
    );



    await this.state.reload();


    await this.loadCocktail();


    this.editing.set(false);

  }
  ngOnDestroy(): void {

    this.clearImageUrl();

    this.clearStepImageUrls();

  }

  async delete(): Promise<void> {

  const dialogRef = this.dialog.open(
    ConfirmDialogComponent,
    {
      width: '400px',
      data: {
        title: 'Удаление коктейля',
        message: `Удалить "${this.cocktail()?.name}"?`
      }
    }
  );

  const confirmed = await dialogRef.afterClosed().toPromise();

  if (!confirmed) {
    return;
  }

  await this.cocktailService.deleteCocktail(
    this.cocktail()!.id
  );

  this.router.navigate(['/cocktails']);

}
}