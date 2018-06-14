import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-compete',
  templateUrl: './compete.component.html',
  styleUrls: ['./compete.component.scss']
})
export class CompeteComponent implements OnInit {

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
