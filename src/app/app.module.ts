import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { StudentComponent } from './components/student/student.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataService } from './services/data.service';
import { PostsComponent } from './components/posts/posts.component';
import { PostService } from './services/post.service';
import {CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { UsersSEComponent } from './components/users-se/users-se.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { StaffComponent } from './components/staff/staff.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ClassroomComponent} from './components/classroom/classroom.component';
import { BuildingComponent } from './components/building/building.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ClassroomDetailComponent } from './components/classroom-detail/classroom-detail.component';
import { ClassroomEditComponent } from './components/classroom-edit/classroom-edit.component';
<<<<<<< HEAD
import { ClassroomDetailDialogComponent } from './components/classroom-detail-dialog/classroom-detail-dialog.component';
=======
import { CourseComponent } from './components/course/course.component';
>>>>>>> 4dc2d14dbc9339131a984a0d144bb19e63fc9bee


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
    ClassroomDetailComponent,
    ClassroomEditComponent,
<<<<<<< HEAD
    ClassroomDetailDialogComponent
=======
    CourseComponent,
>>>>>>> 4dc2d14dbc9339131a984a0d144bb19e63fc9bee

   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDeqBKjtOUNXR_H33V1oWKYSWWjsGA3J-E',
      language: 'it',
      libraries: ['geometry', 'places']
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, PostService],
  bootstrap: [AppComponent],
  entryComponents: [
    ClassroomDetailDialogComponent
  ]
})
export class AppModule { }
