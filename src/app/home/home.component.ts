import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
