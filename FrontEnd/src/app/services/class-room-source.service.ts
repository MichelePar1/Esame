import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { classroomEntity } from '../entities/classroom.entity';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomSourceService {

 protected http = inject(HttpClient);


  fetchClasses(): Observable<classroomEntity[]> {
    return this.http.get<classroomEntity[]>('/api/classrooms')  
  }

addClassroom(studentsInput: User[], name: string): Observable<classroomEntity[]> {
  let students: string[] = []
  studentsInput.forEach((s) => {
  if (s.id) {
    students.push(s.id);
  }
  });

  return this.http.post<classroomEntity[]>('/api/classrooms', { students, name });
}


}
