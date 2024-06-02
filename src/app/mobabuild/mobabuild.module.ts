import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobabuildRoutingModule } from './mobabuild-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { SearchBuildComponent } from './pages/search-build/search-build.component';
import { DeleteBuildComponent } from './components/delete-build/delete-build.component';
import { AddBuildPageComponent } from './pages/add-build-page/add-build-page.component';
import { EditBuildPageComponent } from './pages/edit-build-page/edit-build-page.component';
import { SearchBuildCardComponent } from './components/search-build-card/search-build-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewBuildPageComponent } from './pages/view-build-page/view-build-page.component';
import { Base64ToImagePipe } from './pipe/base64ToImage.pipe';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { FavBuildPageComponent } from './pages/fav-build-page/fav-build-page.component';
import { UserBuildPageComponent } from './pages/user-build-page/user-build-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SearchBuildComponent,
    DeleteBuildComponent,
    AddBuildPageComponent,
    EditBuildPageComponent,
    SearchBuildCardComponent,
    ViewBuildPageComponent,
    Base64ToImagePipe,
    ProfilePageComponent,
    FavBuildPageComponent,
    UserBuildPageComponent,
  ],
  imports: [
    CommonModule,
    MobabuildRoutingModule,
    MaterialModule,
    MatPaginatorModule
  ]
})
export class MobabuildModule { }
