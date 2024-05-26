import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobabuildRoutingModule } from './mobabuild-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';
import { SearchBuildComponent } from './pages/search-build/search-build.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SearchBuildComponent
  ],
  imports: [
    CommonModule,
    MobabuildRoutingModule,
    MaterialModule
  ]
})
export class MobabuildModule { }
