import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HindiVersionComponent } from './hindi-version/hindi-version.component';
import { TamilVersionComponent } from './tamil-version/tamil-version.component';
import { AutheringLocalComponent } from './authering-local/authering-local.component';
import { AutheringServerComponent } from './authering-server/authering-server.component';
import { KannadaVersionComponent } from './kannada-version/kannada-version.component';
import { LearnerAiComponent } from './learner-ai/learner-ai.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ta',  canActivate: [AuthGuard], component: TamilVersionComponent },
  { path: 'hi',  canActivate: [AuthGuard],component: HindiVersionComponent },
  { path: 'kn', canActivate: [AuthGuard], component: KannadaVersionComponent },
  { path: 'learner-ai', component: LearnerAiComponent },
  { path: 'authoring-local', component: AutheringLocalComponent },
  { path: 'authoring-server', component: AutheringServerComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
