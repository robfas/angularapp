import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { UsersSEComponent } from './components/users-se/users-se.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { StudentComponent } from './components/student/student.component';
import { StaffComponent } from './components/staff/staff.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { DepartmentComponent } from './components/department/department.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CourseComponent } from './components/course/course.component';
import { BuildingComponent } from './components/building/building.component';
import { AddBuildingComponent } from './components/add-building/add-building.component';
import { CourseTypeComponent } from './components/course-type/course-type.component';
import { SchoolCalendar2Component } from './components/school-calendar2/school-calendar2.component';
import { SubjectComponent } from './components/subject/subject.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ExamCalendarComponent } from './components/exam-calendar/exam-calendar.component';
import { AcademicYearComponent } from './components/academic-year/academic-year.component';
import { LessonTeacherComponent } from './components/lesson-teacher/lesson-teacher.component';
import { TermComponent } from './components/term/term.component';
import { SubjectTypeComponent } from './components/subject-type/subject-type.component';
import { EditCalendarComponent } from './components/edit-calendar/edit-calendar.component';
import { ExamComponent } from './components/exam/exam.component';


const routes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'users', component: UsersSEComponent},
  {path: 'student', component: StudentComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'teacher', component: TeacherComponent},
  {path: 'staff/department', component: DepartmentComponent},
  {path: 'posts/:id', component: PostDetailComponent},
  {path: 'staff/tickets/ticket/:id', component: TicketComponent},
  {path: 'teacher/tickets/ticket/:id', component: TicketComponent},
  {path: 'staff/department/building/:id', component: BuildingComponent},
  {path: 'staff/department/add/building', component: AddBuildingComponent},
  {path: 'staff/newcourse', component: CourseComponent},
  {path: 'staff/newcoursetype', component: CourseTypeComponent},
  {path: 'staff/calendar', component: CalendarComponent},
  {path: 'staff/editcalendar', component: EditCalendarComponent},
  {path: 'staff/examcalendar', component: ExamCalendarComponent},
  {path: 'staff/newsubject', component: SubjectComponent},
  {path: 'staff/newsubjecttype', component: SubjectTypeComponent},
  {path: 'staff/tickets', component: TicketsComponent},
  {path: 'teacher/tickets', component: TicketsComponent},
  {path: 'staff/corsi/:id', component: CoursesComponent},
  {path: 'staff/academicYears', component: AcademicYearComponent},
  {path: 'teacher/lesson', component: LessonTeacherComponent},
  {path: 'teacher/exams', component: ExamComponent},
  {path: 'staff/terms/:id', component: TermComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
