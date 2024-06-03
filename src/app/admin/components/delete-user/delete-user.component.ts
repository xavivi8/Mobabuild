import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit{

  /**
   * @xavivi8
   * @description cosntructor para la componente de eliminar usuario
   * @param {MatDialogRef<DeleteUserComponent>} dialogRef
   * @param {User} user
   * @param {UserService} userService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {

  }

  /**
   * @xavivi8
   * @description elimina el usuario por la id
   */
  async deleteUser() {
    try {
      const success = await this.userService.deleteUserById(this.user.id).toPromise();

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
   * @xavivi8
   * @description cierra el modal
   */
  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

}
