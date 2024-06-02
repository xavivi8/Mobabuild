import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authority, User } from 'src/app/shared/interfaces/user';
import { UserService } from '../../service/user.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorityService } from 'src/app/admin/services/authority.service';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;
  public user: User = {
    id: 0,
    email: '',
    user_name: '',
    pass: '',
    image: "",
    builds: [],
    favoriteBuild: null,
    authorities: [],
  }
  snackBar: any;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService,
    private authoritySercice: AuthorityService,
  ) {
    this.userForm = new FormGroup({
      id: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      user_name: new FormControl("", [Validators.required]),
      pass: new FormControl(""),
      image: new FormControl(""),
      favoriteBuild: new FormControl(""),
      builds: new FormControl(null),
      authorities: new FormControl(""),
    });
  }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  async ngOnInit(): Promise<void> {
    this.isLogged();

    if (!this.isLogged()) {
      this.router.navigate(['/mobabuild/search_build']);
    }

    var mayUser = await this.getUser();

    if (mayUser) {
      this.user = mayUser;
      this.userForm.patchValue(this.user);
    }
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
   * @description obtiene el usuario por el id en el localStorage
   * @returns {Promise<User | null>}
   */
  async getUser(): Promise<User | null> { // Cambiar el tipo de retorno a `Promise<User | null>`
    const userString = localStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      try {
        return await firstValueFrom(this.userService.findById(user.id));
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null; // Manejar el caso de error devolviendo `null`
      }
    }
    return null; // Devuelve `null` si no hay usuario en `localStorage`
  }

  /**
   * @xavivi8
   * @description redirige al login
   * @returns {boolean}
   */
  isLogged(): boolean {
    return this.sharedService.isLoggedIn();
  }

  /**
   * @xavivi8
   * @description actualiza el usuario
   */
  async confirmEdit() {
    try {
      if (this.userForm.valid) {
        const newUser = this.userForm.value;
        if (this.fileBase64) {
          newUser.image = this.fileBase64.toString().split(',')[1]; // Solo la parte base64
        }
        const RESPONSE = await firstValueFrom(this.userService.updateUser(newUser));
        debugger
        if (RESPONSE && RESPONSE as User) {
          var mayUser = await this.getUser();

          if (mayUser) {
            this.user = mayUser;
            this.userForm.patchValue(this.user);
          }
          this.snackBar.open('El objeto se actualizo correctamente.', CLOSE, { duration: 5000 });
        } else {
          this.snackBar.open('No se pudo actualizar el usuario.', CLOSE, { duration: 5000 });
        }
      }
    } catch (error) {
      console.error('Error al actualizar el objeto:', error);
      this.snackBar.open('Ocurre un error al actualizar el objeto.', CLOSE, { duration: 5000 });
    }
  }

  /**
   * @xavivi8
   * @description cancela o vuelve al home
   */
  onNoClick(): void {
    this.router.navigate(['/mobabuild/search_build']);
  }
}
