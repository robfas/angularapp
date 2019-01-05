import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { LoginService } from '../../services/login.service';
import { first } from 'rxjs/operators';
import{User} from '../models/User';
import { NavbarService } from '../../services/navbar.service';
import { CourseService } from '../../services/course.service';
import { DegreeCourse } from '../models/DegreeCourse';
import { CourseType } from '../models/CourseType';
import { SubjectService } from '../../services/subject.service';
import { SubjectStudy } from '../models/SubjectStudy';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../models/Ticket';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  courses: DegreeCourse[];
  courseTypes: CourseType[];
  subjects: SubjectStudy[];
  tickets: Ticket[];
  teacherbadge: number = 0;
  staffbadge: number = 0;

  constructor(public nav: NavbarService, private loginService: LoginService, private router: Router, public courseService: CourseService, public subjectService: SubjectService, public ticketService: TicketService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.user={
        iduser:JSON.parse(localStorage.getItem('currentUser')).iduser,
        name: JSON.parse(localStorage.getItem('currentUser')).name,
        surname: JSON.parse(localStorage.getItem('currentUser')).surname,
        type: JSON.parse(localStorage.getItem('currentUser')).type
      }

      if(this.user.type === 'employee'){
        this.ticketService.getTickets().subscribe(tickets =>{
          this.tickets = tickets;
          for(let i of this.tickets){
            if(i.ticketmessages.length % 2 !== 0){
              this.staffbadge +=1;
              console.log(this.staffbadge);
            }         
          }
        });
      }
      if(this.user.type === 'teacher'){
        this.ticketService.getTickets().subscribe(tickets => {
          this.tickets = tickets.filter(tickets=>tickets.teacher.idteacher === this.user.iduser);
          console.log(this.tickets);
          for(let i of this.tickets){
            if(i.ticketmessages.length % 2 === 0){
              this.teacherbadge+=1;
              console.log(this.teacherbadge);
            }         
          }
         
        });
      }
    
    this.courseService.getAllCourseTypes().subscribe(courseTypes=>{
      this.courseTypes=courseTypes;
      console.log(courseTypes)
    });
    this.subjectService.getAll().subscribe(subjects => {
      this.subjects = subjects.filter(subjects=>subjects.teacherDTO.idteacher == this.user.iduser);
      console.log(this.subjects);
    });


    }
  }

  signInUser(email,password) {
    this.loginService.login(email,password)
            .pipe(first())
            .subscribe(
                data => {
                  if (data.type == "teacher") {
                    this.user={
                      name: data.name,
                      surname: data.surname,
                      iduser: data.iduser
                    }
                    this.router.navigate(['/teacher']);
                  } else if(data.type  == "employee") {
                    this.user={
                      name: data.name,
                      surname: data.surname,
                      iduser: data.iduser
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
