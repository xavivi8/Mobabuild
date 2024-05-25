import { Component, Inject, OnInit } from '@angular/core';
import { Rune } from '../../../shared/interfaces/rune';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RuneService } from '../../services/rune.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-edit-rune',
  templateUrl: './edit-rune.component.html',
  styleUrls: ['./edit-rune.component.css']
})
export class EditRuneComponent implements OnInit{
  runeForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<EditRuneComponent>,
    private runeService: RuneService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public rune: Rune,
  ) { }
  ngOnInit(): void {
    this.runeForm = new FormGroup({
      id: new FormControl(this.rune.id, [Validators.required]),
      name: new FormControl(this.rune.name, [Validators.required]),
      rowType: new FormControl(this.rune.rowType, [Validators.required]),
      group_name: new FormControl(this.rune.group_name, [Validators.required]),
      description: new FormControl(this.rune.description, [Validators.required]),
      long_description: new FormControl(this.rune.long_description, [Validators.required]),
      image: new FormControl(this.rune.image),
    });
  }

  async confirmEdit() {
    try {
      if (this.runeForm.valid) {
        const newRune = this.runeForm.value;
        const RESPONSE = await firstValueFrom(this.runeService.update(newRune));
        if (RESPONSE && RESPONSE as Rune) {
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
   * @description cierra el componente
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });

  }
}
