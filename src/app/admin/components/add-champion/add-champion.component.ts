import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChampionService } from '../../services/champion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-add-champion',
  templateUrl: './add-champion.component.html',
  styleUrls: ['./add-champion.component.css']
})
export class AddChampionComponent implements OnInit{

  championForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;

  /**
   * @xavivi8
   * @description cosntructor para la componente de añadir campeon
   * @param {MatDialogRef<AddChampionComponent>} dialogRef
   * @param {ChampionService} ChampionService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<AddChampionComponent>,
    private ChampionService: ChampionService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  ngOnInit(): void {
    this.championForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
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
        this.championForm.patchValue({ image: this.fileBase64 });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * @xavivi8
   * @description añade el campeon por la id
   */
  async confirmAdd() {
    try {
      debugger
      if (this.championForm.valid) {
        const object = this.championForm.value;
        if (this.fileBase64) {
          object.image = this.fileBase64.toString().split(',')[1];
        }
        const RESPONSE = await firstValueFrom(this.ChampionService.addChampion(object));
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
