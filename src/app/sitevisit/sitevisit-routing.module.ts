import { UpdateComponent } from './update/update.component';
import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrmprintComponent } from './frmprint/frmprint.component';

const routes: Routes = [
  { path: '', redirectTo:'main',pathMatch:'full' },
  { path: 'main', component: MainComponent },
  { path: 'main/:start/:end/:status/:pageIndex/:pageSize/:region/:probgid/:problemsubid', component: MainComponent },
  { path: 'add', component: AddComponent },
  { path: 'update/:sw_no/:start/:end/:status/:pageIndex/:pageSize/:region/:probgid/:problemsubid', component: UpdateComponent },
  { path: 'frmprint/:sw_no', component: FrmprintComponent },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitevisitRoutingModule { }
