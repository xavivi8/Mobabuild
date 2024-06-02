import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObjectService } from '../../services/object.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectD } from 'src/app/shared/interfaces/object';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-edit-object',
  templateUrl: './edit-object.component.html',
  styleUrls: ['./edit-object.component.css']
})
export class EditObjectComponent implements OnInit{
  objectForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<EditObjectComponent>} dialogRef
   * @param {ObjectService} servicioObject
   * @param {MatSnackBar} snackBar
   * @param {ObjectD} objectD
   */
  constructor(
    public dialogRef: MatDialogRef<EditObjectComponent>,
    private servicioObject: ObjectService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public objectD: ObjectD,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el formulario
   */
  ngOnInit(): void {
    this.objectForm = new FormGroup({
      id: new FormControl(this.objectD.id, [Validators.required]),
      name: new FormControl(this.objectD.name, [Validators.required]),
      image: new FormControl(this.objectD.image),
    })
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
   * @description actualiza el objeto
   */
  async confirmEdit() {
    try {
      if (this.objectForm.valid) {
        debugger
        const object = this.objectForm.value;
        if (this.fileBase64) {
          object.image = this.fileBase64.toString().split(',')[1]; // Solo la parte base64
        }
        const RESPONSE = await firstValueFrom(this.servicioObject.editObject(object));
        if (RESPONSE && RESPONSE as ObjectD) {
          this.snackBar.open('El objeto se actualizo correctamente.', CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: true, data: RESPONSE });
        } else {
          this.snackBar.open('No se pudo actualizar el objeto.', CLOSE, { duration: 5000 });
        }
      }
    } catch (error) {
      console.error('Error al actualizar el objeto:', error);
      this.snackBar.open('Ocurre un error al actualizar el objeto.', CLOSE, { duration: 5000 });
    }
  }

  /**
   * @xavivi8
   * @description cierra el dialog
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });

  }

}
