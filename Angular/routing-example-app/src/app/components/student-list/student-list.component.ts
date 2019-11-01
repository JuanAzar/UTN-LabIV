import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

//Reactive Forms
@Component({
  selector: 'my-component',
  template: 'MyComponent Template'
})
export class MyComponent implements OnInit {
  nameChangeLog: string[] = [];
  studentForm: FormGroup;

  ngOnInit() {
    this.logNameChange();
  }
  logNameChange() {
    const firstNameControl = this.studentForm.get('firstName');
    firstNameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}

