import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserSE } from '../models/UserSE';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usersSE: UserSE[];
  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  signInUser(email,password) {
    this.postService.login({email,password} as UserSE).subscribe(userSE=>{
      console.log(userSE);
    });
  }

}
