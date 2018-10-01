import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { LoginService } from '../../services/login.service';
import { UserSE } from '../models/UserSE';
import { first } from 'rxjs/operators';
import{User} from '../models/User';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usersSE: UserSE[];
  user: User;
  constructor(public nav: NavbarService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.user={
        firstName: JSON.parse(localStorage.getItem('currentUser')).name
      }
    }
  }

  signInUser(email,password) {
    this.loginService.login(email,password)
            .pipe(first())
            .subscribe(
                data => {
                  if (data.typeDTO.idType == 2) {
                    this.user={
                      firstName: data.name
                    }
                    this.router.navigate(['/teacher']);
                  } else if(data.typeDTO.idType == 3) {
                    this.user={
                      firstName: data.name
                    }
                    this.router.navigate(['/staff']);
                  } else {
                    alert("Accesso non autorizzato");
                  }
                },
                error => {
                  alert(error.error.message);
                });
  }

  logout() {
    this.loginService.logout();
    this.nav.showHome();
    this.router.navigate(['/']);
  }

}
