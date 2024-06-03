import { Component, Inject, OnInit } from '@angular/core';
import { BuildService } from '../../service/build.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Build } from 'src/app/shared/interfaces/build';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-delete-build',
  templateUrl: './delete-build.component.html',
  styleUrls: ['./delete-build.component.css']
})
export class DeleteBuildComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteBuildComponent>,
    @Inject(MAT_DIALOG_DATA) public build: Build,
    private userService: BuildService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {

  }

  async deleteBuild() {
    try {
      if (this.build.id) {
        const success = await this.userService.delete(this.build.id).toPromise();
        if (success) {
          this.snackBar.open('La build se eliminó correctamente.', CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: true, data: 'ok' });
        } else {
          this.snackBar.open('No se pudo eliminar la build.', CLOSE, { duration: 5000 });
        }
      } else {
        this.snackBar.open('No tiene id la build.', CLOSE, { duration: 5000 });
      }

    } catch (error) {
      console.error('Error al eliminar la build:', error);
      this.snackBar.open('Ocurrio un error al eliminar la build.', CLOSE, { duration: 5000 });
    }
  }

  /**
   * @xavivi8
   * @description cierra el modal
   */
  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

}
