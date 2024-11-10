import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentAsyncService } from '../../services/student-async.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.css'
})
export class StudentViewComponent implements OnInit {
  student: Student = new Student();

  constructor(private studentService: StudentAsyncService, private route: ActivatedRoute) { }

  ngOnInit() {
    let studentId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.studentService.getById(studentId)
      .then(response => {
        this.student = response;
      })
      .catch(error => {
        console.log(error);
      })
  }
}