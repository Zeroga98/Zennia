import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs';

import { AuthService, CourseService } from '../../shared/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public courses: any = [];

  constructor(
    private ngProgress: NgProgress,
    private authService: AuthService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    //this.ngProgress.start();
    //setTimeout(() => { this.ngProgress.done(); }, 1000); 
    this.getCourses();
  }

  private getCourses(){
    this.courseService.getCourses()
    .subscribe(data => {
      this.courses = data;
    });
  }

}