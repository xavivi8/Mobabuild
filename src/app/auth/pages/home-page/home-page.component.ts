import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  public menu = { label: 'Menú', icon: 'menu' }

  public sidebarItems = [
    { label: 'Admin', icon: 'admin_panel_settings', url: '/admin' },
    { label: 'Mobabuild', icon: 'movie', url: '/mobabuild/search_build' },
    /* { label: 'Login', icon: 'login', url: '/auth' } */
  ]

  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.router.navigate(['/mobabuild/search_build']);
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
