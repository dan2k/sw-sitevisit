import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitevisitRoutingModule } from './sitevisit-routing.module';
import { AddComponent } from './add/add.component';
import { MainComponent } from './main/main.component';
// import { MatInputModule, MatSelectModule,MatButtonModule,MatIconModule, MatDatepickerModule, MatCheckboxModule } from '@angular/material';
/* import {
  // MatAutocompleteModule,
  // MatBadgeModule,
  // MatBottomSheetModule,
  //MatButtonModule,
  //MatButtonToggleModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  MatDatepickerModule,
  // MatDialogModule,
  // MatDividerModule,
  // MatExpansionModule,
  // MatGridListModule,
  MatIconModule,
  MatInputModule,
  // MatListModule,
  // MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  // MatProgressBarModule,
  MatProgressSpinnerModule,
  // MatRadioModule,
  // MatRippleModule,
  MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatSnackBarModule,
  MatSortModule,
  // MatStepperModule,
  MatTableModule,
  // MatTabsModule,
  // MatToolbarModule,
  // MatTooltipModule,
  // MatTreeModule,
} from '@angular/material'; */
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update/update.component';


@NgModule({
  imports: [
    CommonModule,
    SitevisitRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  /*
  // MatAutocompleteModule,
  // MatBadgeModule,
  // MatBottomSheetModule,
  //MatButtonModule,
  //MatButtonToggleModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  MatDatepickerModule,
  // MatDialogModule,
  // MatDividerModule,
  // MatExpansionModule,
  // MatGridListModule,
  MatIconModule,
  MatInputModule,
  // MatListModule,
  // MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  // MatProgressBarModule,
  MatProgressSpinnerModule,
  // MatRadioModule,
  // MatRippleModule,
  MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatSnackBarModule,
  MatSortModule,
  // MatStepperModule,
  MatTableModule,
  // MatTabsModule,
  // MatToolbarModule,
  // MatTooltipModule,
  // MatTreeModule, */
  ],
  declarations: [AddComponent, MainComponent, UpdateComponent]
})
export class SitevisitModule { }
