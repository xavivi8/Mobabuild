import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectService } from '../../services/object.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';
import { MatDialogRef } from '@angular/material/dialog';
import { ObjectD } from 'src/app/shared/interfaces/object';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {
  objectForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<AddObjectComponent>} dialogRef
   * @param {ObjectService} objectService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<AddObjectComponent>,
    private objectService: ObjectService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el formulario
   */
  ngOnInit(): void {
    this.objectForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
      objectSets: new FormControl(null),
    });
  }

  /**
   * @xavivi8
   * @description selecciona el archivo
   * @param {any} event
   */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileBase64 = reader.result;
        this.objectForm.patchValue({ image: this.fileBase64 });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * @xavivi8
   * @description añade el objeto
   */
  async confirmAdd() {
    try {
      debugger
      if (this.objectForm.valid) {
        const object = this.objectForm.value;
        if (this.fileBase64) {
          object.image = this.fileBase64.toString().split(',')[1];
        }
        const RESPONSE = await firstValueFrom(this.objectService.setObject(object));
        if (RESPONSE && RESPONSE as ObjectD) {
          this.snackBar.open('El objeto se añadio correctamente.', CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: true, data: RESPONSE });
        } else {
          this.snackBar.open('No se pudo añadir el objeto.', CLOSE, { duration: 5000 });
        }
      }
    } catch (error) {
      console.error('Error al eliminar el objeto:', error);
      this.snackBar.open('Ocurrió un error al añadir el objeto.', CLOSE, { duration: 5000 });
    }
  };

  /**
   * @xavivi8
   * @description cierra el dialog
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

}
