import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public ngProgress: NgProgress
  ) { }

  ngOnInit() {
    this.ngProgress.start();

   setTimeout(() => {
        this.ngProgress.done();
    }, 1000); 
  }

}
