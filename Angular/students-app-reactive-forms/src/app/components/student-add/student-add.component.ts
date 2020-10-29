import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { StudentAsyncService } from 'src/app/services/student-async.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  message: string = '';

  studentForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl('')
  });
   
  constructor(private studentService: StudentAsyncService) { }

  ngOnInit() {
    
  }

  addStudent(){
    let student = new Student();
    student.firstName = this.studentForm.get('firstName').value;
    student.lastName = this.studentForm.get('lastName').value;
    student.dni = this.studentForm.get('dni').value;
    student.email = this.studentForm.get('email').value;
    student.address = this.studentForm.get('address').value;

    this.studentService.add(student)
      .then(response  => {
        this.message = "Student successfully added";
      })
      .catch(error =>{
        this.message = "An error has occurred!";
      })
  }
}
