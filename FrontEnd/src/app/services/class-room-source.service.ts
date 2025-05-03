import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { classroomEntity } from '../entities/classroom.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomSourceService {

 protected http = inject(HttpClient);


  fetchClasses(): Observable<classroomEntity[]> {
    return this.http.get<classroomEntity[]>('/api/classrooms')  
  }


}
