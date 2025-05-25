import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { authGuard } from './utils/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AssigmentsComponentComponent } from './pages/assigments.component/assigments.component.component';
import { ClassroomContainerComponent } from './pages/classroom-container/classroom-container.component';

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
    path: 'classrooms',
    component: ClassroomContainerComponent,
    canActivate: [authGuard],
    children:[
        {
          path:'',
          component: ClassroomComponent,
      },
      {
          path: ':classroomId/assigments',
          component: AssigmentsComponentComponent
      },
    ]
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
