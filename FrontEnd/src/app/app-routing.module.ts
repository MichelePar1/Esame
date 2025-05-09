import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { authGuard } from './utils/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AssigmentsComponentComponent } from './pages/assigments.component/assigments.component.component';

const routes: Routes = [
  {
    path:'register',
    component: RegisterComponent
  }, 
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'classrooms',
    component: ClassroomComponent,
    canActivate: [authGuard]
  },
  {
    path: 'classrooms/:classId/assigments',
    component: AssigmentsComponentComponent
  },
  {
    path:'',
    component: LoginComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
