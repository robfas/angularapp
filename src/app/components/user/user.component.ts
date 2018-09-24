import { Component, OnInit } from '@angular/core';
import{User} from '../models/User'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
    this.user={
      firstName: 'Giggi',
      lastName: 'Manco',
      age: 30,
      address : {
        street: 'viale Rossini',
        city: 'Lecce',
        state: 'IT'
      }
    }
   


    console.log(this.sayHello());
    console.log(this.user.age);
    this.hasBirthday();
    console.log(this.user.age);
  }

sayHello(): string{
  return 'Hello' + this.user.firstName;
}

hasBirthday() {
  this.user.age += 1;
}

}


