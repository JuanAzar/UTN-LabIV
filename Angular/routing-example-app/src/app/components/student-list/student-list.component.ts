import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList = new Array<Student>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentList = this.studentService.getAll();
  }

}
