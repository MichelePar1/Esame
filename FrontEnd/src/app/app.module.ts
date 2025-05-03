import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './utils/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IfAuthenticatedDirective } from './utils/if-authenticated.directive';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { RegisterComponent } from './pages/register/register.component';
import { ClassRoomCardComponent } from './components/class-room-card/class-room-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IfAuthenticatedDirective,
    ClassroomComponent,
    RegisterComponent,
    ClassRoomCardComponent,
    NavBarComponent,
    NavUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
