import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64ToImage'
})
export class Base64ToImagePipe implements PipeTransform {

  transform(base64: string | null | undefined): string {
    if (!base64) {
      return 'assets/poro.jpg'; // Imagen por defecto si no hay base64
    }
    return `data:image/jpeg;base64,${base64}`;
  }

}
