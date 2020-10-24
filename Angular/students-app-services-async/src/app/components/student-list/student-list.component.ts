import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentAsyncService } from 'src/app/services/student-async.service';

//Reactive Forms
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: Array<Student> = [];

  constructor(private studentService: StudentAsyncService) { }

  ngOnInit() {
    this.studentService.getAll()
      .then(response => {
        this.studentList = response;
      })
      .catch(error => {
        console.log(error);
      })
  }
}

