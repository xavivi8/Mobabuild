import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';
import { AddUserRequest, AuthorityName } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  authorityOptions = [
    { value: [AuthorityName.ADMIN], viewValue: 'Admin' },
    { value: [AuthorityName.READ], viewValue: 'Read' },
    { value: [AuthorityName.WRITE], viewValue: 'Write' },
    { value: [AuthorityName.READ, AuthorityName.WRITE], viewValue: 'Read & Write' },
  ];
  hidePass: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      user_name: new FormControl(null, [Validators.required]),
      pass: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
      authority: new FormControl(null, [Validators.required]),
    })
  }

  async confirmAdd() {
    try {
      if (this.userForm.valid) {
        const user = this.userForm.value;
        const addUserRequest: AddUserRequest = {
          email: user.email,
          userName: user.user_name,
          pass: user.pass,
          authorityNames: user.authority
        }
        const RESPONSE = await firstValueFrom(this.userService.addUserWithoutImage(addUserRequest));
        if (RESPONSE) {
          this.snackBar.open('El usuario se añadio correctamente.', CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: true, data: RESPONSE });
        } else {
          this.snackBar.open('No se pudo añadir el usuario.', CLOSE, { duration: 5000 });
        }
      }
    } catch (error) {
      console.error('Error al añadir el usuario:', error);
      this.snackBar.open('Ocurrio un error al añadir el usuario.', CLOSE, { duration: 5000 });
    }
  };

  togglePasswordVisibility(): void {
    this.hidePass = !this.hidePass;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
