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


@NgModule({
  declarations: [
    HomePageComponent,
    SearchBuildComponent,
    DeleteBuildComponent,
    AddBuildPageComponent,
    EditBuildPageComponent,
    SearchBuildCardComponent,
    ViewBuildPageComponent,
  ],
  imports: [
    CommonModule,
    MobabuildRoutingModule,
    MaterialModule,
    MatPaginatorModule
  ]
})
export class MobabuildModule { }
