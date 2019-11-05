import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  studentList = new Array<Student>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getAll().subscribe(response => {
      this.studentList = response as Array<Student>;
    })
  }
}
