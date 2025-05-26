import { Component, EventEmitter, Input, Output } from '@angular/core';
import { assigmentEntity } from '../../entities/assigment.entity';
import { User } from '../../entities/user.entity';
import { assigmentInfoEntity } from '../../entities/assigmentInfo.entity';

@Component({
  selector: 'app-assigment-card',
  standalone: false,
  templateUrl: './assigment-card.component.html',
  styleUrl: './assigment-card.component.css'
})
export class AssigmentCardComponent {

  @Input()
  assigment: assigmentEntity|undefined

  
  professor: any

  
  @Output()
  selecAssigment = new EventEmitter<string>();

  ngOnInit(){
    this.professor = this.assigment?.createdBy as User
  }

  CompleteAssigment(assigmentId?:string){
    this.selecAssigment.emit(assigmentId)
  }


  

}
