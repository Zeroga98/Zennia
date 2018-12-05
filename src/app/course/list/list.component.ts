import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, CourseService, UserService } from '../../shared/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public subscribeUser;
  public courses: any = [];
  public user: any;

  constructor(
    private router: Router,
    private ngProgress: NgProgress,
    private courseService: CourseService,
    private userService: UserService
  ) { }

  ngOnInit() {
    //this.ngProgress.start();
    //setTimeout(() => { this.ngProgress.done(); }, 1000); 
    this.subscribeUser = this.userService.$userCurrent.subscribe(user => this.user = user);
    this.getCourses();
  }

  ngOnDestroy(){
    this.subscribeUser.unsubscribe();
  }

  private getCourses(){
    this.courseService.getCourses()
    .subscribe(data => {
      console.log(data);
      this.courses = data;
    });
  }

  public redirectLesson(course: any, lesson: any, type: string){
    if(this.user){
      if(this.user.rol == 'ADMIN' || type)
        this.router.navigate(['/cursos', course.id, 'leccion', (type == 'new'? 'new': lesson.id), 'admin']);
      else
        this.router.navigate(['/curso', course.id, 'leccion', lesson.id, 'evaluar']);
    }
  }

}