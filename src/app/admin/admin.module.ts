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
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { ListChampionPageComponent } from './pages/list-champion-page/list-champion-page.component';
import { AddChampionComponent } from './components/add-champion/add-champion.component';
import { EditChampionComponent } from './components/edit-champion/edit-champion.component';
import { DeleteChampionComponent } from './components/delete-champion/delete-champion.component';
import { ListRunePageComponent } from './pages/list-rune-page/list-rune-page.component';
import { ListSpellPageComponent } from './pages/list-spell-page/list-spell-page.component';
import { DeleteRuneComponent } from './components/delete-rune/delete-rune.component';
import { EditRuneComponent } from './components/edit-rune/edit-rune.component';
import { AddRuneComponent } from './components/add-rune/add-rune.component';
import { AddSpellComponent } from './components/add-spell/add-spell.component';
import { DeleteSpellComponent } from './components/delete-spell/delete-spell.component';
import { EditSpellComponent } from './components/edit-spell/edit-spell.component';
import { Base64ToImagePipe } from '../shared/pipe/base64ToImage.pipe';


@NgModule({
  declarations: [
    HomePageComponent,
    ListObjectPageComponent,
    AddObjectComponent,
    DeleteObjectComponent,
    EditObjectComponent,
    ListUserPageComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    ListChampionPageComponent,
    AddChampionComponent,
    EditChampionComponent,
    DeleteChampionComponent,
    ListRunePageComponent,
    ListSpellPageComponent,
    DeleteRuneComponent,
    EditRuneComponent,
    AddRuneComponent,
    AddSpellComponent,
    DeleteSpellComponent,
    EditSpellComponent,
    Base64ToImagePipe,
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
