import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClassRoomSourceService } from '../../services/class-room-source.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject, switchMap, combineLatest } from 'rxjs';
import { classroomEntity } from '../../entities/classroom.entity';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classroom',
  standalone: false,
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent {
  private AuthSrv = inject(AuthService)
  private UserSrv = inject(UserService)
  private ClassRoomSrv = inject(ClassRoomSourceService)
  private router = inject(Router)

  className: string = '';

  studentList$: Observable<User[]> = this.UserSrv.fetchUsers();
  private selectedStudentsSubject = new BehaviorSubject<User[]>([]);
  selectedStudents$ = this.selectedStudentsSubject.asObservable();


  refresh$ = new ReplaySubject<void>()

  classi$ = combineLatest([
    this.refresh$,
  ]).pipe(
    switchMap(() => this.ClassRoomSrv.fetchClasses())
  )

  constructor(){
    this.refresh$.next()
    }
    
    trackById(_: any, Class: classroomEntity) {
      return Class.id;
    }

    resList(list:User[]){
      this.selectedStudentsSubject.next(list)
    }

   pushClass(name: string) {
    this.selectedStudents$.subscribe(students => {
    this.ClassRoomSrv.addClassroom(students, name).subscribe()})
    this.refresh$.next()
    }

    GoToAssigments(className?:string){
    this.router.navigate([`/classrooms/${className}/assigments`]);
    }


  } 

