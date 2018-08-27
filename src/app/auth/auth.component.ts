import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ChairaAuth } from '../shared/constanst';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public urlLoginChaira: string;

  constructor(
    public ngProgress: NgProgress,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.urlLoginChaira = ChairaAuth.urlAuthLogin;
    //this.ngProgress.start();
    //this.ngProgress.done();

    let code_oauth = this.activateRouter.snapshot.queryParams['code'];
    if(code_oauth){
      console.log(code_oauth);
      //this.getAccessToken(code_oauth);
    }
  }

}
