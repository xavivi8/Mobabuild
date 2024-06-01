import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit{
  public menu = { label: 'Menú', icon: 'menu' }
  public isLogedIn = false

  public sidebarItems = [
    { label: 'Admin', icon: 'admin_panel_settings', url: '/admin' },
    { label: 'Mobabuild', icon: 'movie', url: '/mobabuild/search_build' },
    /* { label: 'Login', icon: 'login', url: '/auth' } */
  ]

  constructor(
    private router: Router,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.router.navigate(['/mobabuild/search_build']);
    this.isLogged();
  }

  /**
   * Método para realizar la acción de cierre de sesión.
   * Utiliza el servicio SharedService para realizar el logout.
   * @returns {void}
   */
  logout(){
    this.sharedService.doLogout()
  }

  login(){
    this.router.navigate(['/auth/login']);
  }

  isLogged(){
    this.isLogedIn = this.sharedService.isLoggedIn();
  }
}
