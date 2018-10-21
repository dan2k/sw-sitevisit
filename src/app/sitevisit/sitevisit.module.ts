import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitevisitRoutingModule } from './sitevisit-routing.module';
import { AddComponent } from './add/add.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update/update.component';
import { MainComponent } from './main/main.component';
@NgModule({
  imports: [
    CommonModule,
    SitevisitRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    AddComponent,
    UpdateComponent,
    MainComponent
  ]
})
export class SitevisitModule { }
