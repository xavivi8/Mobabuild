import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';
import { AddUserRequest, AuthorityName, User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;

  authorityOptions = [
    { value: [AuthorityName.ADMIN], viewValue: 'Admin' },
    { value: [AuthorityName.READ], viewValue: 'Read' },
    { value: [AuthorityName.WRITE], viewValue: 'Write' },
    { value: [AuthorityName.READ, AuthorityName.WRITE], viewValue: 'Read & Write' },
  ];
  hidePass: boolean = true;

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<AddUserComponent>} dialogRef
   * @param {UserService} userService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el formulario
   */
  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      user_name: new FormControl(null, [Validators.required]),
      pass: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
      authority: new FormControl(null, [Validators.required]),
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
        this.userForm.patchValue({ image: this.fileBase64 });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * @xavivi8
   * @description añade el objeto
   */
  async confirmAdd() {
    try {
      if (this.userForm.valid) {
        const user = this.userForm.value;
        const addUserRequest: AddUserRequest = {
          email: user.email,
          userName: user.user_name,
          pass: user.pass,
          authorityNames: user.authority,
          image: ""
        }
        if (this.fileBase64) {
          addUserRequest.image = this.fileBase64.toString().split(',')[1];
        }
        const RESPONSE = await firstValueFrom(this.userService.addUserWithoutImage(addUserRequest));
        if (RESPONSE && RESPONSE as User) {
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
