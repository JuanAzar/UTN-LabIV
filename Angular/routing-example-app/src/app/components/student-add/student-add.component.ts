import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  firstName : string;
  lastName : string;
  dni : string;
  email : string;
  address : string;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  addStudent()
  {
    let student = new Student();
    student.firstName = this.firstName;
    student.lastName = this.lastName;
    student.dni = this.dni;
    student.email = this.email;
    student.address = this.address;

    this.studentService.add(student);
  }
}
