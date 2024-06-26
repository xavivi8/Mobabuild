import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChampionService } from '../../services/champion.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Champions } from 'src/app/shared/interfaces/champions';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-edit-champion',
  templateUrl: './edit-champion.component.html',
  styleUrls: ['./edit-champion.component.css']
})
export class EditChampionComponent implements OnInit{
  championForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<EditChampionComponent>} dialogRef
   * @param {ChampionService} ChampionService
   * @param {MatSnackBar} snackBar
   * @param {Champions} champions
   */
  constructor(
    public dialogRef: MatDialogRef<EditChampionComponent>,
    private ChampionService: ChampionService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public champion: Champions,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  ngOnInit(): void {
    this.championForm = new FormGroup({
      id: new FormControl(this.champion.id, [Validators.required]),
      name: new FormControl(this.champion.name, [Validators.required]),
      image: new FormControl(this.champion.image),
      builds: new FormControl(this.champion.builds),
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
        this.championForm.patchValue({ image: this.fileBase64 });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * @xavivi8
   * @description actualiza el campeon
   */
  async confirmEdit() {
    try {
      if (this.championForm.valid) {
        const newChampion = this.championForm.value;
        if (this.fileBase64) {
          newChampion.image = this.fileBase64.toString().split(',')[1]; // Solo la parte base64
        }
        debugger
        const RESPONSE = await firstValueFrom(this.ChampionService.editChampion(newChampion));
        if (RESPONSE && RESPONSE as Champions) {
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
