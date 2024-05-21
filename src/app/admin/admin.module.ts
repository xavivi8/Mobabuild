import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { ListObjectPageComponent } from './pages/list-object-page/list-object-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { AddObjectComponent } from './components/add-object/add-object.component';
import { DeleteObjectComponent } from './components/delete-object/delete-object.component';
import { EditObjectComponent } from './components/edit-object/edit-object.component';
import { ListUserPageComponent } from './pages/list-user-page/list-user-page.component';
import { AddUserComponent } from './components/add-user/add-user.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ListObjectPageComponent,
    AddObjectComponent,
    DeleteObjectComponent,
    EditObjectComponent,
    ListUserPageComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule
  ]
})
export class AdminModule { }
