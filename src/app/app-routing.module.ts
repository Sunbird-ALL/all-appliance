import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HindiVersionComponent } from './hindi-version/hindi-version.component';
import { TamilVersionComponent } from './tamil-version/tamil-version.component';


const routes: Routes = [
  { path: '', component: TamilVersionComponent },
  { path: 'hi', component: HindiVersionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
