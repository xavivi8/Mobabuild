import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListObjectPageComponent } from './pages/list-object-page/list-object-page.component';

const routes: Routes = [

  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'object', component: ListObjectPageComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
