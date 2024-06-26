import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RuneService } from '../../services/rune.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-add-rune',
  templateUrl: './add-rune.component.html',
  styleUrls: ['./add-rune.component.css']
})
export class AddRuneComponent implements OnInit{
  runeForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<AddRuneComponent>} dialogRef
   * @param {RuneService} runeService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<AddRuneComponent>,
    private runeService: RuneService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el formulario
   */
  ngOnInit(): void {
    this.runeForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      rowType: new FormControl(null, [Validators.required]),
      group_name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      long_description: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
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
   * @description añade el objeto por la id
   */
  async confirmAdd() {
    try {
      debugger
      if (this.runeForm.valid) {
        const object = this.runeForm.value;
        if (this.fileBase64) {
          object.image = this.fileBase64.toString().split(',')[1];
        }
        const RESPONSE = await firstValueFrom(this.runeService.create(object));
        if (RESPONSE) {
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
