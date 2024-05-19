import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectService } from '../../services/object.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {
  objectForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<AddObjectComponent>,
    private objectService: ObjectService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.objectForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }

  async confirmAdd() {
    try {
      debugger
      if (this.objectForm.valid) {
        const object = this.objectForm.value;
        const RESPONSE = await firstValueFrom(this.objectService.setObject(object.name));
        if (RESPONSE && RESPONSE === 1) {
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

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

}
