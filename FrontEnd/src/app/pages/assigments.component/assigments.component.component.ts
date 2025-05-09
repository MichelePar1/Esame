import { Component, inject } from '@angular/core';
import { combineLatest, ReplaySubject, switchMap } from 'rxjs';
import { AssigmentsServiceService } from '../../services/assigments.service.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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

   assigments$ = combineLatest([
      this.refresh$,
    ]).pipe(
      switchMap(() => this.AssigmentSrv.fetchAssigments(this.classroomId))
    )

    constructor(private route: ActivatedRoute){}

    ngOnInit(){
       this.classroomId = this.route.snapshot.paramMap.get('classroomId')
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
}




}
