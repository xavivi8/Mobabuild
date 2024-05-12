import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
