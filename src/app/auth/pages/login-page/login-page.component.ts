import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../../interfaces/UserLogin';
import { User } from 'src/app/shared/interfaces/user';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

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
      pass: new FormControl(null, [Validators.required]),
    })
  }

  async login() {
    debugger
    if (this.userForm.valid) {
      const userLogin: UserLogin = {
        email: this.userForm.get('email')?.value,
        pass: this.userForm.get('pass')?.value
      };

      try {
        const RESPONSE = await this.userService.login(userLogin);
        debugger
        if (RESPONSE) {
          const USER: User = RESPONSE;
          localStorage.setItem('user', JSON.stringify(USER));
          this.router.navigate(['/mobabuild/search_build']);
        } else {
          this.snackBar.open('Credenciales incorrectas', CLOSE, {
            duration: 3000
          });
        }
      } catch (error) {
        this.snackBar.open('Credenciales incorrectas', CLOSE, {
          duration: 3000
        });
        console.error('Error during login:', error);
      }
    }
  }

  cancelar() {
    this.router.navigate(['/mobabuild/search_build']);
  }

  createUser(){
    this.router.navigate(['/auth/register']);
  }

  togglePasswordVisibility(): void {
    this.hidePass = !this.hidePass;
  }
}
