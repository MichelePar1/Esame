import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-classroom',
  standalone: false,
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent {
  private AuthSrv = inject(AuthService)
  constructor(){
    this.AuthSrv.fetchUser().subscribe(
      res => {
        if(res?.id){
          console.log(res?.fullName)
        }else{
          console.log("errore")
        }
      }
    );    
  }
}
