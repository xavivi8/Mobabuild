import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material/material.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { Base64ToImagePipe } from './pipe/base64ToImage.pipe';


@NgModule({
  declarations: [
    HomePageComponent,
    Error404PageComponent,
    Base64ToImagePipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule
  ]
})
export class SharedModule { }
