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
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<EditRuneComponent>} dialogRef
   * @param {RuneService} runeService
   * @param {MatSnackBar} snackBar
   * @param {Rune} rune
   */
  constructor(
    public dialogRef: MatDialogRef<EditRuneComponent>,
    private runeService: RuneService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public rune: Rune,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el formulario
   */
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
        this.runeForm.patchValue({ image: this.fileBase64 });
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
      if (this.runeForm.valid) {
        const newRune = this.runeForm.value;
        if (this.fileBase64) {
          newRune.image = this.fileBase64.toString().split(',')[1]; // Solo la parte base64
        }
        const RESPONSE = await firstValueFrom(this.runeService.update(newRune));
        if (RESPONSE && RESPONSE as Rune) {
          this.snackBar.open('El objeto se actualizó correctamente.', CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: true, data: RESPONSE });
        } else {
          this.snackBar.open('No se pudo actualizar el objeto.', CLOSE, { duration: 5000 });
        }
      }
    } catch (error) {
      console.error('Error al actualizar el objeto:', error);
      this.snackBar.open('Ocurrió un error al actualizar el objeto.', CLOSE, { duration: 5000 });
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
