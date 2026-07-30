import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageValidationService {

  private readonly allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];


  validateFile(file: File): boolean {

    return this.allowedTypes.includes(file.type);

  }

}