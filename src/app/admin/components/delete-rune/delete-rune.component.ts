import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rune } from 'src/app/shared/interfaces/rune';
import { RuneService } from '../../services/rune.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-delete-rune',
  templateUrl: './delete-rune.component.html',
  styleUrls: ['./delete-rune.component.css']
})
export class DeleteRuneComponent {
  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<DeleteRuneComponent>} dialogRef
   * @param {Rune} rune
   * @param {RuneService} runeService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<DeleteRuneComponent>,
    @Inject(MAT_DIALOG_DATA) public rune: Rune,
    private runeService: RuneService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @xavivi8
   * @description elimina la runa
   */
  async deleteChampion() {
    try {
      const success = await this.runeService.delete(this.rune).toPromise();

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
