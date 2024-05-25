import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent {
  public menu = { label: 'Menú', icon: 'menu' }

  public sidebarItems = [
    { label: 'Admin', icon: 'admin_panel_settings', url: '/admin' },
    { label: 'Peliculas', icon: 'movie', url: '/peliculas' },
    { label: 'Control usuarios', icon: 'person', url: '/user-management' },
    /* { label: 'Login', icon: 'login', url: '/auth' } */
  ]

  public adminMenuItems = [
    { label: 'Object', icon: 'keep', url: './object' },
    { label: 'User', icon: 'hive', url: './user' },
    { label: 'Champions', icon: 'keep', url: './champion' },
    { label: 'Runas', icon: 'hive', url: './rune' },
    { label: 'Object111', icon: 'keep', url: './w' },
    { label: 'Runa111', icon: 'hive', url: './w' },
  ]

  public displayedAdminMenuItems: { label: string; icon: string; url: string }[] = [];
  currentUrl: string = '';

  constructor(
    private router: Router,

  ) {

  }

  ngOnInit() {
    this.displayedAdminMenuItems = this.adminMenuItems.slice(0, 3);
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
    //this.sharedService.doLogout()
  }
}
