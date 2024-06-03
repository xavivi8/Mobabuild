import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { SharedService } from 'src/app/shared/service/shared.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  public menu = { label: 'Menú', icon: 'menu' }
  public isLogedIn = false

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

  public sidebarItems = [
    { label: 'Perfil', icon: 'account_circle', url: '/mobabuild/profiel' },
    { label: 'Admin', icon: 'admin_panel_settings', url: '/admin' },
    { label: 'Mobabuild', icon: 'movie', url: '/mobabuild/search_build' },
    { label: 'User builds', icon: 'list', url: '/mobabuild/user_builds' },
    /* { label: 'Login', icon: 'login', url: '/auth' } */
  ]

  /**
   * @xavivi8
   * @description redirige al login
   * @param {Router} router
   * @param {SharedService} sharedService
   * @param {UserService} userService
   */
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  async ngOnInit(): Promise<void> {
    this.router.navigate(['/mobabuild/search_build']);
    this.isLogged();
    var mayUser = await this.getUser();

    if (mayUser) {
      this.user = mayUser;
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
   * Método para realizar la acción de cierre de sesión.
   * Utiliza el servicio SharedService para realizar el logout.
   * @returns {void}
   */
  logout(){
    this.sharedService.doLogout()
  }

  /**
   * @xavivi8
   * @description redirige al login
   */
  login(){
    this.router.navigate(['/auth/login']);
  }

  /**
   * @xavivi8
   * @description redirige al login
   */
  isLogged(){
    this.isLogedIn = this.sharedService.isLoggedIn();
  }
}
