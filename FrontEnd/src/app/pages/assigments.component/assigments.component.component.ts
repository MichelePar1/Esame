import { Component, inject } from '@angular/core';
import { combineLatest, ReplaySubject, switchMap } from 'rxjs';
import { AssigmentsServiceService } from '../../services/assigments.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { assigmentInfoEntity } from '../../entities/assigmentInfo.entity';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-assigments.component',
  standalone: false,
  templateUrl: './assigments.component.component.html',
  styleUrl: './assigments.component.component.css'
})
export class AssigmentsComponentComponent {

  private AssigmentSrv = inject(AssigmentsServiceService)
  refresh$ = new ReplaySubject<void>()
  classroomId: string|any
 assimnetName: string|any

  studentsAssigmentInfo: assigmentInfoEntity[] = [];

   assigments$ = combineLatest([
      this.refresh$,
    ]).pipe(
      switchMap(() => this.AssigmentSrv.fetchAssigments(this.classroomId))
    )

    constructor(private route: ActivatedRoute){}

    ngOnInit(){
       this.classroomId = this.route.snapshot.paramMap.get('classroomId')
        this.infoRefresh()
      this.refresh$.next()
    }

  patchAssigment(assigmentId: string) {
  this.AssigmentSrv
    .patchAssigments(this.classroomId, assigmentId)
    .subscribe({
      next: ()  => this.refresh$.next(),
      error: err => console.error(err)
    });
}


pushAssignment(assimnetName:string){
    this.AssigmentSrv
    .pushAssignment(assimnetName, this.classroomId)
    .subscribe({
      next: ()  => this.refresh$.next(),
      error: err => console.error(err)
    });
    this.infoRefresh()
}

getStudentName(s: { studentsId: User | string }): string {
  const student = s.studentsId as User;
  return student?.fullName || 'Sconosciuto';
}

infoRefresh(){
   this.AssigmentSrv.fetchAssigmentsInfo(this.classroomId).subscribe({
      next: (data) => {
      this.studentsAssigmentInfo = data
      }})
}


}
