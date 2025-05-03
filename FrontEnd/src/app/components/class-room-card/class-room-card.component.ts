import { Component, Input } from '@angular/core';
import { classroomEntity } from '../../entities/classroom.entity';

@Component({
  selector: 'app-class-room-card',
  standalone: false,
  templateUrl: './class-room-card.component.html',
  styleUrl: './class-room-card.component.css'
})
export class ClassRoomCardComponent {


  @Input()
  class!: classroomEntity

  ngOnInit(){
    console.log(this.class)
  }


  
}
