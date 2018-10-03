import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ChairaAuth } from '../shared/constanst';
import { AuthService } from '../shared/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public urlLoginChaira: string;

  constructor(
    public ngProgress: NgProgress,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.urlLoginChaira = ChairaAuth.urlAuthLogin;
    //this.ngProgress.start();
    //this.ngProgress.done();

    let code_oauth = this.activateRouter.snapshot.queryParams['code'];
    if(code_oauth)
      this.getAccessToken(code_oauth);
  }

  private getAccessToken(code: string){
    this.authService.getAccessToken(code)
    .subscribe(data => {
      console.log(data);
    }, error => {
      let response = JSON.parse(error.error.text.replace('{"d":null}', ''));
      if(response.state == 'OK'){
        this.authService.saveDataLocalStorage(JSON.parse(error.error.text.replace('{"d":null}', '')));
        this.authService.setUser(this.authService.getUserLocalStorage());
        this.router.navigate(['/']);
      } else {
        console.log(response);
      }
    });
  }

}
