import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListObjectPageComponent } from './pages/list-object-page/list-object-page.component';
import { ListUserPageComponent } from './pages/list-user-page/list-user-page.component';
import { ListChampionPageComponent } from './pages/list-champion-page/list-champion-page.component';
import { ListRunePageComponent } from './pages/list-rune-page/list-rune-page.component';

const routes: Routes = [

  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'object', component: ListObjectPageComponent },
      { path: 'user', component: ListUserPageComponent },
      { path: 'champion', component: ListChampionPageComponent },
      { path: 'rune', component: ListRunePageComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
