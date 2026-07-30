import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageUrlService {


  createUrl(
    image: Blob | null
  ): string | null {

    if (!image) {
      return null;
    }
    return URL.createObjectURL(image);

  }

  revokeUrl(
    url: string
  ): void {

    URL.revokeObjectURL(url);

  }

}