import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HindiVersionComponent } from './hindi-version/hindi-version.component';
import { TamilVersionComponent } from './tamil-version/tamil-version.component';
import { AutheringLocalComponent } from './authering-local/authering-local.component';
import { AutheringServerComponent } from './authering-server/authering-server.component';
import { KannadaVersionComponent } from './kannada-version/kannada-version.component';
import { LearnerAiComponent } from './learner-ai/learner-ai.component';
import { TestRigComponent } from './test-rig/test-rig.component';


const routes: Routes = [
  { path: '', component: TamilVersionComponent },
  { path: 'hi', component: HindiVersionComponent },
  { path: 'kn', component: KannadaVersionComponent },
  { path: 'learner-ai', component: LearnerAiComponent },

  { path: 'authoring-local', component: AutheringLocalComponent },
  { path: 'authoring-server', component: AutheringServerComponent },
  { path: 'test-rig', component: TestRigComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
