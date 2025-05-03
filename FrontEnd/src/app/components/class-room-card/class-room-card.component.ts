import { Component, Input } from '@angular/core';
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

  professor: any
  
  ngOnInit(){
    console.log(this.class)
    this.professor = this.class.createdBy as User
  }

  
  
}
