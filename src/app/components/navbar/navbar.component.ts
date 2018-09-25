import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { LoginService } from '../../services/login.service';
import { NavbarService } from '../../services/navbar.service';
import { UserSE } from '../models/UserSE';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usersSE: UserSE[];
  constructor(public nav: NavbarService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  signInUser(email,password) {
    this.loginService.login(email,password)
            .pipe(first())
            .subscribe(
                data => {
                  this.nav.showNavStaff();
                    this.router.navigate(['/staff']);
                    console.log(data.username);
                },
                error => {
                  alert(error.error.message);
                });
  }

}
