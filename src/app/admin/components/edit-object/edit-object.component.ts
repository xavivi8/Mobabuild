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

  constructor(
    public dialogRef: MatDialogRef<EditObjectComponent>,
    private servicioObject: ObjectService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public objectD: ObjectD,
  ) { }
  ngOnInit(): void {
    this.objectForm = new FormGroup({
      id: new FormControl(this.objectD.id, [Validators.required]),
      name: new FormControl(this.objectD.name, [Validators.required]),
    })
  }

  async confirmEdit() {
    try {
      if (this.objectForm.valid) {
        debugger
        const object = this.objectForm.value;
        const RESPONSE = await firstValueFrom(this.servicioObject.editObject(object));
        if (RESPONSE && RESPONSE === true) {
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

  onNoClick(): void {
    this.dialogRef.close({ ok: false });

  }

}
