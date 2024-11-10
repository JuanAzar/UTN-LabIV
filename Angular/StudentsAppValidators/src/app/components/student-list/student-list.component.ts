import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from '../../services/student-async.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
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