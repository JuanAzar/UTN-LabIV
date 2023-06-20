//app.component.ts
import { Component } from '@angular/core';
import { Car } from './models/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cars Application Example';
  carList = new Array<Car>();
  car = new Car();

  showSelectedCar(car : Car) {
    this.car = car;
  }
}