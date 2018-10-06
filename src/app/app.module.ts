import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { StudentComponent } from './components/student/student.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataService } from './services/data.service';
import { PostsComponent } from './components/posts/posts.component';
import { PostService } from './services/post.service';

import { HttpClientModule } from '@angular/common/http';
import { UsersSEComponent } from './components/users-se/users-se.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { StaffComponent } from './components/staff/staff.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { BuildingComponent } from './components/building/building.component';
import { TicketComponent } from './components/ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StudentComponent,
    NavbarComponent,
    PostsComponent,
    UsersSEComponent,
    HomeComponent,
    NotFoundComponent,
    PostDetailComponent,
    StaffComponent,
    TeacherComponent,
    ClassroomComponent,
    BuildingComponent,
    TicketComponent,

   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
   
  ],
  providers: [DataService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
