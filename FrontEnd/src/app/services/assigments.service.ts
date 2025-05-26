import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { classroomEntity } from '../entities/classroom.entity';
import { assigmentEntity } from '../entities/assigment.entity';
import { assigmentInfoEntity } from '../entities/assigmentInfo.entity';

@Injectable({
  providedIn: 'root'
})
export class AssigmentsServiceService {

   protected http = inject(HttpClient);

   fetchAssigments(classId:string): Observable<assigmentEntity[]> {
    return this.http.get<assigmentEntity[]>('/api/classrooms/'+classId+'/assigments')  
  }
  fetchAssigmentsInfo(classId:string) {
    return this.http.get<assigmentInfoEntity[]>('/api/classrooms/'+classId+'/assigmentsInfo')  
  }


  patchAssigments(classId: string, assigmentId:string){
    return this.http.patch<assigmentEntity[]>('/api/classrooms/'+classId+'/assignments/'+assigmentId, {})  
  }

pushAssignment(title: string, classId: string) {
    return this.http.post<assigmentEntity>(
      '/api/classrooms/' + classId + '/assigments',
      { title }
    );
  }


}
