import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageCompressionService {

  private readonly targetWidth = 540;
  private readonly targetHeight = 720;


  compress(file: File): Promise<Blob> {

    return new Promise(resolve => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        const scale = Math.min(
          this.targetWidth / img.width,
          this.targetHeight / img.height,
          1
        );
        const width =
          Math.round(img.width * scale);
        const height =
          Math.round(img.height * scale);
        const canvas =
          document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx =
          canvas.getContext('2d');

        if (!ctx) {
          resolve(file);
          return;

        }

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        canvas.toBlob(
          blob => {

            resolve(
              blob ?? file
            );
          },
          'image/webp',
          0.8
        );
      };
      img.src = url;
    });
  }
}