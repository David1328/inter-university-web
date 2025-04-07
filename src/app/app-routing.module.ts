import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectControllerViewComponent } from './private/pages/subject-controller-view/subject-controller-view.component';
import { LoginComponent } from './private/pages/login/login.component';
import { StudentRegistryComponent } from './private/pages/student-registry/student-registry.component';
import { SubjectParnertsReviewComponent } from './private/pages/subject-parnerts-review/subject-parnerts-review.component';

const routes: Routes = [
  { path: 'subject-review', component: SubjectControllerViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'studentRegistry', component: StudentRegistryComponent },
  { path: 'subject-parnerts-review', component: SubjectParnertsReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
