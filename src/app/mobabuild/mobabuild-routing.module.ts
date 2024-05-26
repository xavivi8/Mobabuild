import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddBuildPageComponent } from './pages/add-build-page/add-build-page.component';
import { EditBuildPageComponent } from './pages/edit-build-page/edit-build-page.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'home_page', component: HomePageComponent },
      { path: 'add_build', component: AddBuildPageComponent },
      { path: 'edit_build', component: EditBuildPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobabuildRoutingModule { }
