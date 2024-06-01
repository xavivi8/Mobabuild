import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddUserRequest, User } from 'src/app/shared/interfaces/user';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';
import { UserComand } from '../../interfaces/UserComand';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{
  userForm: FormGroup = new FormGroup({});
  hidePass: boolean = true;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      user_name: new FormControl(null, [Validators.required]),
      pass: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
    })
  }

  async confirmAdd() {
    try {
      if (this.userForm.valid) {
        const user = this.userForm.value;
        const addUserRequest: UserComand = {
          email: user.email,
          user_name: user.user_name,
          pass: user.pass,
          id: null
        }

        const RESPONSE = await firstValueFrom(this.userService.create(addUserRequest));
        if (RESPONSE && RESPONSE as User) {
          const USER: User = RESPONSE;
          localStorage.setItem('user', JSON.stringify(USER));
          this.router.navigate(['/mobabuild/search_build']);
          this.snackBar.open('El usuario se añadio correctamente.', CLOSE, { duration: 5000 });
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

  login() {
    this.router.navigate(['/auth/login']);
  }

  cancelar() {
    this.router.navigate(['/mobabuild/search_build']);
  }
}
