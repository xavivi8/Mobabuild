import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChampionService } from '../../services/champion.service';
import { Champions } from 'src/app/shared/interfaces/champions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-delete-champion',
  templateUrl: './delete-champion.component.html',
  styleUrls: ['./delete-champion.component.css']
})
export class DeleteChampionComponent implements OnInit{

  /**
   * @xavivi8
   * @description cosntructor para la componente de eliminar campeon
   * @param {MatDialogRef<DeleteChampionComponent>} dialogRef
   * @param {Champions} champion
   * @param {ChampionService} ChampionService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<DeleteChampionComponent>,
    @Inject(MAT_DIALOG_DATA) public champion: Champions,
    private ChampionService: ChampionService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  ngOnInit(): void {

  }

  /**
   * @xavivi8
   * @description elimina el campeon
   */
  async deleteChampion() {
    try {
      const success = await this.ChampionService.deleteChampion(this.champion).toPromise();
      debugger

      if (success) {
        this.snackBar.open('El objeto se eliminó correctamente.', CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: true, data: 'ok' });
      } else {
        this.snackBar.open('No se pudo eliminar el objeto.', CLOSE, { duration: 5000 });
      }
    } catch (error) {
      console.error('Error al eliminar el objeto:', error);
      this.snackBar.open('Ocurrió un error al eliminar el objeto.', CLOSE, { duration: 5000 });
    }
  }

  /**
   * Metodo para cerrar el dialog
   */
  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

}
