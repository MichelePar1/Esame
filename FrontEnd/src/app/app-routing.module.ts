import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { authGuard } from './utils/auth.guard';
import { RegisterComponent } from './pages/register/register.component';

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
    path:'classroom',
    component: ClassroomComponent,
    canActivate: [authGuard]
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
