import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Spell } from 'src/app/shared/interfaces/spell';
import { SpellService } from '../../../mobabuild/service/spell.service';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-delete-spell',
  templateUrl: './delete-spell.component.html',
  styleUrls: ['./delete-spell.component.css']
})
export class DeleteSpellComponent {

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<DeleteSpellComponent>} dialogRef
   * @param {Spell} spell
   * @param {SpellService} spellService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<DeleteSpellComponent>,
    @Inject(MAT_DIALOG_DATA) public spell: Spell,
    private spellService: SpellService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @xavivi8
   * @description elimina el spell
   */
  async deleteChampion() {
    try {
      const success = await this.spellService.delete(this.spell).toPromise();

      if (success) {
        this.snackBar.open('El hechizo se eliminó correctamente.', CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: true, data: 'ok' });
      } else {
        this.snackBar.open('No se pudo eliminar el hechizo.', CLOSE, { duration: 5000 });
      }
    } catch (error) {
      console.error('Error al eliminar el hechizo:', error);
      this.snackBar.open('Ocurrió un error al eliminar el hechizo.', CLOSE, { duration: 5000 });
    }
  }

  /**
   * Metodo para cerrar el dialog
   */
  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

}
