import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { MarathonService, UserService } from '../shared/services';

@Component({
  selector: 'app-compete',
  templateUrl: './compete.component.html',
  styleUrls: ['./compete.component.scss']
})
export class CompeteComponent implements OnInit {

  constructor(
    public ngProgress: NgProgress,
    private marathonService: MarathonService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }
}
