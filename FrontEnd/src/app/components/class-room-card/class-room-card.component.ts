import { Component, EventEmitter, Input, Output } from '@angular/core';
import { classroomEntity } from '../../entities/classroom.entity';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-class-room-card',
  standalone: false,
  templateUrl: './class-room-card.component.html',
  styleUrl: './class-room-card.component.css'
})
export class ClassRoomCardComponent {


  @Input()
  class!: classroomEntity


  @Output()
  selecClass = new EventEmitter<string>();

  professor: any
  
  ngOnInit(){
    this.professor = this.class.createdBy as User
  }

  getClass(idClass?:string){
    this.selecClass.emit(idClass)
  }



  
  
}
