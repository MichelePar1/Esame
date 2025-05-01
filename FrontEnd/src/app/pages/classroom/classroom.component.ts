import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClassRoomSourceService } from '../../services/class-room-source.service';
import { Observable, Subject } from 'rxjs';
import { classroomEntity } from '../../entities/classroom.entity';

@Component({
  selector: 'app-classroom',
  standalone: false,
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent {
  private AuthSrv = inject(AuthService)
  private ClassRoomSrv = inject(ClassRoomSourceService)


  private ClassListSubject = new Subject<classroomEntity[]>();
  classlist$: Observable<classroomEntity[]> = this.ClassListSubject.asObservable();


  
  constructor(){
    this.AuthSrv.fetchUser().subscribe(
      res => {
        if(res?.id){
          console.log(res?.fullName)
        }else{
          console.log("errore come cazzo sei entrato?")
        }
      }      
    );   
      this.ClassRoomSrv.fetchClasses().subscribe(classes=>{
        this.ClassListSubject.next(classes)
      }
      )
    }
    


    trackById(_: any, Class: classroomEntity) {
      return Class.id;
    }


  }

