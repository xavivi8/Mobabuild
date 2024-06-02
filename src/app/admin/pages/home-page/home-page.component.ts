import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { SharedService } from 'src/app/shared/service/shared.service';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
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
    { label: 'Mobabuild', icon: 'movie', url: '/mobabuild' },
    /* { label: 'Login', icon: 'login', url: '/auth' } */
  ]

  public adminMenuItems = [
    { label: 'Object', icon: 'keep', url: './object' },
    { label: 'User', icon: 'hive', url: './user' },
    { label: 'Champions', icon: 'keep', url: './champion' },
    { label: 'Runas', icon: 'hive', url: './rune' },
    { label: 'spell', icon: 'keep', url: './spell' },
  ]

  public displayedAdminMenuItems: { label: string; icon: string; url: string }[] = [];
  currentUrl: string = '';

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
  ) {

  }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  async ngOnInit() {
    this.displayedAdminMenuItems = this.adminMenuItems.slice(0, 3);
    this.isLogged();
    if(!this.isAuthenticated() || !this.isLogedIn){
      this.router.navigate(['/mobabuild/search_build']);
    }
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

  onMenuItemClick(menuItem: { label: string; icon: string; url: string }) {
    // Aquí puedes manejar lo que sucede cuando se hace clic en un elemento del menú
    console.log('Clicked on menu item:', menuItem);
  }

  toggleAdminMenu() {
    // Este método se llama cuando se hace clic en el botón "more_horiz"
    // Cambia los elementos mostrados del menú entre los primeros tres y el resto
    if (this.displayedAdminMenuItems.length === 3) {
      this.displayedAdminMenuItems = this.adminMenuItems.slice(3);
    } else {
      this.displayedAdminMenuItems = this.adminMenuItems.slice(0, 3);
    }
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
   * @description verifica si hay un usuario
   */
  isLogged(){
    this.isLogedIn = this.sharedService.isLoggedIn();
  }

  /**
   * @xavivi8
   * @description verifica si hay un usuario
   * @returns {boolean}
   */
  isAuthenticated() {
    var isAuth = this.sharedService.isAuthenticated();
    return isAuth;
  }
}
