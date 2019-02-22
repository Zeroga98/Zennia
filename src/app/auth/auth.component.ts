import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';

import { ChairaAuth } from '../shared/constanst';
import { AuthService, UserService } from '../shared/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public urlLoginChaira: string;
  public form: FormGroup;
  public showError: string;
  public signupUser: any;
  public loading = false;

  constructor(
    public ngProgress: NgProgress,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
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
    if(code_oauth){
      this.loading = true;
      this.getAccessToken(code_oauth);
    }
  }

  public login(user){
    /* this.loading = true; */
    this.authService.login(this.form.controls.email.value, this.form.controls.password.value)
    .subscribe((data: any) => {
      if(data.state == 'OK'){
        this.authService.saveDataLocalStorage(data.user);
        this.userService.setUserCurrent(data.user)
        this.router.navigate(['/curso/home']);
      } else {
        console.log(data.type);
      }
    });
/*      this.authService.login( user.CORREO, "") 
    .subscribe((data: any) => {
      if(data.state == 'OK'){
        console.log(data)
        this.loading = false;
        this.authService.saveDataLocalStorage(data.user);
        this.userService.setUserCurrent(data.user)
        this.router.navigate(['/curso/home']);
      } else {
        this.loading = false;
        this.authService.signup(user);
        this.login(user)
        console.log(data.type);
      }
    }); */
  }

  private getAccessToken(code: string){
    this.authService.getAccessToken(code)
    .subscribe(data => {
      this.loading = false;
      console.log(data);
    }, error => {
      this.loading = false;
      if(error.status != 0){
        let response = JSON.parse(error.error.text.replace('{"d":null}', ''));
        if(response.state == 'OK'){
          let email = JSON.parse(response.scope)[0].CORREO;
          this.signupUser = JSON.parse(response.scope)[0];
          console.log(email);
          this.login(this.signupUser);
          /*this.authService.saveDataLocalStorage(JSON.parse(error.error.text.replace('{"d":null}', '')));
          this.authService.setUser(this.authService.getUserLocalStorage());
          this.authService.saveUserFirebase(this.authService.getUserLocalStorage());*/
       /*    this.router.navigate(['/curso/home']); */
          console.log(response);
        } else {
          console.log(response);
        }
      } else {
        console.log("Ocurrio un problema en el servidor de Chairá, intentalo más tarde");
      }
    });
  }

}
