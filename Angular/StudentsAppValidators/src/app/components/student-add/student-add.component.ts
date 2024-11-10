import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../common/custom-validators';
import { StudentAsyncService } from '../../services/student-async.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent implements OnInit {
  message: string = '';

  studentForm = new FormGroup({
    firstName: new FormControl('', [ Validators.required, CustomValidators.lettersOnly() ]),
    lastName: new FormControl('', [ Validators.required, CustomValidators.lettersOnly() ]),
    dni: new FormControl('', [ Validators.required ]),
    email: new FormControl('', [ Validators.required, Validators.email, CustomValidators.forbiddenWords(/mail.com/) ], [ CustomValidators.emailExists(inject(StudentAsyncService)) ]),
    address: new FormControl('')
  });
   
  constructor(private studentService: StudentAsyncService) { }

  ngOnInit() {
    
  }

  get firstName() { return this.studentForm.get('firstName'); }
  get lastName() { return this.studentForm.get('lastName'); }
  get dni() { return this.studentForm.get('dni'); }
  get email() { return this.studentForm.get('email'); }
  get address() { return this.studentForm.get('address'); }

  onSubmit(){
    let student = new Student();
    student.firstName = this.firstName?.value!;
    student.lastName = this.lastName?.value!;
    student.dni = Number(this.dni?.value);
    student.email = this.email?.value!;
    student.address = this.address?.value!;

    this.studentService.add(student)
      .then(response  => {
        this.message = "Student successfully added";
      })
      .catch(error =>{
        this.message = "An error has occurred!";
      })
  }
}
