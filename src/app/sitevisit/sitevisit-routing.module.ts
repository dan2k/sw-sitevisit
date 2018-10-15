import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'main',pathMatch:'full' },
  { path: 'main', component: MainComponent },
  { path: 'add', component: AddComponent },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitevisitRoutingModule { }
