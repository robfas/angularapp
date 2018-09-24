import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../components/models/Post';
import { UserSE } from '../components/models/UserSE';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});


@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  usersSEurl: string = 'http://localhost:8080/SpringApp/user/getAll';
  userSEsaveUrl: string = 'http://localhost:8080/SpringApp/user/save';
  loginUrl: string = 'http://localhost:8080/SpringApp/login';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
  }

  login(user: UserSE): Observable<UserSE>{
    return this.http.post<UserSE>(this.loginUrl, user, {headers});
  }

  savePost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.postsUrl,post, {headers});
  }

  getUserSE(): Observable<UserSE[]>{
    return this.http.get<UserSE[]>(this.usersSEurl);
  }

  saveUserSE(userSE: UserSE): Observable<UserSE>{
    return this.http.post<UserSE>(this.userSEsaveUrl, userSE, {headers});
  }

  getPostDetail(id: number): Observable<Post>{
    return this.http.get<Post>(this.postsUrl + '/' + id);
  }
}
