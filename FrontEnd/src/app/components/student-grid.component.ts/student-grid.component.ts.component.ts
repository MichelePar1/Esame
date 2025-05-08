import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-student-grid',
  standalone: false,
  templateUrl: './student-grid.component.ts.component.html',
  styleUrls: ['./student-grid.component.ts.component.css'],
})
export class StudentGridComponentTsComponent {

  @Input()
  students!: User[] | null;

  @Output()
  selecStudent = new EventEmitter<User[]>();

  studentIds: User[] = [];

  ngOnInit() {
    console.log(this.students);
  }

  onListChange(user: User) {
    if (user?.id) {
      const index = this.studentIds.findIndex(u => u.id === user.id);
      if (index === -1) {
        this.studentIds.push(user);
      } else {
        this.studentIds.splice(index, 1);
      }
      this.selecStudent.emit(this.studentIds);
    }
  }
}
