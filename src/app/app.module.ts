import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
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
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { UsersSEComponent } from './components/users-se/users-se.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { StaffComponent } from './components/staff/staff.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { BuildingComponent } from './components/building/building.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ClassroomDetailDialogComponent } from './components/classroom-detail-dialog/classroom-detail-dialog.component';
import { CourseComponent } from './components/course/course.component';
import { DepartmentComponent } from './components/department/department.component';
import { AddBuildingComponent } from './components/add-building/add-building.component';
import { CourseTypeComponent } from './components/course-type/course-type.component';
import { SchoolCalendar2Component } from './components/school-calendar2/school-calendar2.component';
import { SubjectComponent } from './components/subject/subject.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AcademicYearComponent } from './components/academic-year/academic-year.component';
import { ExamCalendarComponent } from './components/exam-calendar/exam-calendar.component';
import { LessonTeacherComponent } from './components/lesson-teacher/lesson-teacher.component';
import { TermComponent } from './components/term/term.component';
import { SubjectTypeComponent } from './components/subject-type/subject-type.component';

registerLocaleData(localeIt);

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
    BuildingComponent,
    TicketComponent,
    ClassroomDetailDialogComponent,
    CourseComponent,
    DepartmentComponent,
    AddBuildingComponent,
    CourseTypeComponent,
    SchoolCalendar2Component,
    SubjectComponent,
    TicketsComponent,
    CoursesComponent,
    CalendarComponent,
    AcademicYearComponent,
    ExamCalendarComponent,
    LessonTeacherComponent,
    TermComponent,
    SubjectTypeComponent,

   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDeqBKjtOUNXR_H33V1oWKYSWWjsGA3J-E',
      language: 'it',
      libraries: ['geometry', 'places']
    }),
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService, PostService],
  bootstrap: [AppComponent],
  entryComponents: [
    ClassroomDetailDialogComponent
  ]
})
export class AppModule { }

  //platformBrowserDynamic().bootstrapModule(AppModule)
