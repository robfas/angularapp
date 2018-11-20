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


const routes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'users', component: UsersSEComponent},
  {path: 'student', component: StudentComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'teacher', component: TeacherComponent},
  {path: 'staff/department', component: DepartmentComponent},
  {path: 'posts/:id', component: PostDetailComponent},
  {path: 'staff/ticket/:id', component: TicketComponent},
  {path: 'staff/department/building/:id', component: BuildingComponent},
  {path: 'staff/newcourse', component: CourseComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
