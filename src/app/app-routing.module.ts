import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HindiVersionComponent } from './hindi-version/hindi-version.component';
import { TamilVersionComponent } from './tamil-version/tamil-version.component';
import { AutheringLocalComponent } from './authering-local/authering-local.component';
import { AutheringServerComponent } from './authering-server/authering-server.component';
import { ContentEditorComponent } from './content-editor/content-editor.component';


const routes: Routes = [
  { path: '', component: TamilVersionComponent },
  { path: 'hi', component: HindiVersionComponent },
  { path: 'authoring-local', component: AutheringLocalComponent },
  { path: 'authoring-server', component: AutheringServerComponent },
  { path: 'sb-editor', component: ContentEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
