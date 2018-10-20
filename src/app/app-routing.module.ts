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
import { ClassroomComponent } from './components/classroom/classroom.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ClassroomDetailComponent } from './components/classroom-detail/classroom-detail.component';
import { CourseComponent } from './components/course/course.component';
import { ClassroomEditComponent } from './components/classroom-edit/classroom-edit.component';


const routes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'users', component: UsersSEComponent},
  {path: 'student', component: StudentComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'teacher', component: TeacherComponent},
  {path: 'staff/classroom', component: ClassroomComponent},
  {path: 'posts/:id', component: PostDetailComponent},
  {path: 'staff/ticket/:id', component: TicketComponent},
  {path: 'staff/classroom/detail/:id', component: ClassroomDetailComponent},
  {path: 'staff/newcourse', component: CourseComponent},
  {path: 'staff/classroom/edit/:id', component: ClassroomEditComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
