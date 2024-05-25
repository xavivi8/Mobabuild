import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Authority, User } from 'src/app/shared/interfaces/user';
import { AuthorityService } from '../../services/authority.service';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  userForm: FormGroup = new FormGroup({});
  authorityOptions: Authority[] = []

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private userService: UserService,
    private authoritySercice: AuthorityService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: User,
  ) { }

  ngOnInit(): void {
    this,this.getAllAuthority();
    this.userForm = new FormGroup({
      id: new FormControl(this.user.id, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      user_name: new FormControl(this.user.user_name, [Validators.required]),
      pass: new FormControl(this.user.pass, [Validators.required]),
      image: new FormControl(this.user.image),
      favoriteBuild: new FormControl(this.user.favoriteBuild),
      builds: new FormControl(this.user.builds),
      authorities: new FormControl(this.user.authorities.map(auth => auth.name), [Validators.required]),
    })


  }

  getAllAuthority(){
    this.authoritySercice.findAll().subscribe((authority) => {
      this.authorityOptions = authority
    })
  }

  async confirmEdit() {
    try {
      if (this.userForm.valid) {
        const newUser = this.userForm.value;
        const RESPONSE = await firstValueFrom(this.userService.updateUser(newUser));
        if (RESPONSE && RESPONSE as User) {
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

  onNoClick(): void {
    this.dialogRef.close({ ok: false });

  }

}
