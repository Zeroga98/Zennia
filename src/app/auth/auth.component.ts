import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  public form: FormGroup;
  public showError: string;

  constructor(
    public ngProgress: NgProgress,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private authService: AuthService
  ) { 
    this.form = this.formBuilder.group({
      'email': this.formBuilder.control('', [Validators.required]),
      'password': this.formBuilder.control('', [Validators.required])
    });
  }

  ngOnInit() {
    this.urlLoginChaira = ChairaAuth.urlAuthLogin;
    //this.ngProgress.start();
    //this.ngProgress.done();
    let code_oauth = this.activateRouter.snapshot.queryParams['code'];
    if(code_oauth)
      this.getAccessToken(code_oauth);
  }

  public login(){
    this.authService.login(this.form.controls.email.value, this.form.controls.password.value)
    .subscribe((data: any) => {
      if(data.state == 'OK'){
        this.authService.saveDataLocalStorage(data.user);
        this.router.navigate(['/curso/home']);
      } else {
        console.log(data.type);
      }
    });
  }

  private getAccessToken(code: string){
    this.authService.getAccessToken(code)
    .subscribe(data => {
      console.log(data);
    }, error => {
      if(error.status != 0){
        let response = JSON.parse(error.error.text.replace('{"d":null}', ''));
        if(response.state == 'OK'){
          /*this.authService.saveDataLocalStorage(JSON.parse(error.error.text.replace('{"d":null}', '')));
          this.authService.setUser(this.authService.getUserLocalStorage());
          this.authService.saveUserFirebase(this.authService.getUserLocalStorage());*/
          this.router.navigate(['/curso/home']);
        } else {
          console.log(response);
        }
      } else {
        console.log("Ocurrio un problema en el servidor de Chairá, intentalo más tarde");
      }
    });
  }

}
