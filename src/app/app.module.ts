import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ToastrModule } from 'ngx-toastr';
import { SitevisitModule } from './sitevisit/sitevisit.module';
import { MaterialModule } from './material/material.module';

// import {
//    MatButtonModule,
//    MatIconModule,
//    MatListModule,
//    MatSidenavModule,
//    MatToolbarModule,

//  } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SitevisitModule,
    ToastrModule.forRoot(),
    // material module
    BrowserAnimationsModule,
    MaterialModule
    // MatButtonModule,
    // MatIconModule,
    // MatListModule,
    // MatSidenavModule,
    // MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
