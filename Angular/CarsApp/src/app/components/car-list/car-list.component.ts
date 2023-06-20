import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
//car-list.component.ts
export class CarListComponent implements OnInit {
  @Input()
  carList : Array<Car> = [];

  @Output()
  selectedCarEvent = new EventEmitter<Car>();

  constructor() { }

  ngOnInit() {
  }

  selectCar(car : Car){    
    this.selectedCarEvent.emit(car);
  }  
}