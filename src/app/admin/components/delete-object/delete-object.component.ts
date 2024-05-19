import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectD } from 'src/app/shared/interfaces/object';
import { ObjectService } from '../../services/object.service';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-delete-object',
  templateUrl: './delete-object.component.html',
  styleUrls: ['./delete-object.component.css']
})
export class DeleteObjectComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DeleteObjectComponent>,
    @Inject(MAT_DIALOG_DATA) public objectd: ObjectD,
    private objectService: ObjectService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

  }

  async deleteObject() {
    try {
      const success = await this.objectService.deleteObjectById(this.objectd.id).toPromise();
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
