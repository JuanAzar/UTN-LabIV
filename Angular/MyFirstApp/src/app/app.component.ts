//app.component.ts
import { Component } from '@angular/core';
import { Car } from './models/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my first app using Angular';
  name = 'John Doe';
  cars : Array<Car> = [];
  visible = false;

  constructor()
  {
    let car1 = new Car(); car1.brand = 'Peugeot'; car1.model = '508';
    
    let car2 = new Car(); car2.brand = 'Volkswagen'; car2.model = 'Vento';

    let car3 = new Car(); car3.brand = 'Ford'; car3.model = 'Focus';
    
    this.cars.push(car1);
    this.cars.push(car2);
    this.cars.push(car3);
  }
}


