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
  public authType: String = '';
  title: String = '';
  authTitle: String = 'Registrate';
  constructor(
    public ngProgress: NgProgress,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.urlLoginChaira = ChairaAuth.urlAuthLogin;
    //this.ngProgress.start();
    //this.ngProgress.done();
    let code_oauth = this.activateRouter.snapshot.queryParams['code'];
    if (code_oauth) {
      this.loading = true;
      this.getAccessToken(code_oauth);
    }
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Iniciar sesion' : 'Resgistrarse';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authTitle = "¿Tienes una cuenta?";
        this.form.addControl('username', new FormControl());
      }
    });
  }

  public login() {
    this.loading = true; 
    if (this.authType == 'login') {
      this.authService.login(this.form.controls.email.value, this.form.controls.password.value)
        .subscribe((data: any) => {
          if (data.state == 'OK') {
            this.loading = false;
            this.authService.saveDataLocalStorage(data.user);
            console.log(data.user);
            this.userService.setAuth(data.user)
            this.router.navigate(['/']);
          } else {
            this.loading = false;
            this.showError = "Reintenta de nuevo"
            console.log(data.type);
          }
        });
    } else {
      let user = {
        correo: this.form.controls.email.value,
        nombres: this.form.controls.username.value,
        contrasena: this.form.controls.password.value
      }
      this.authService.signup(user).subscribe(data => {
        console.log(data);
        this.authService.login(this.form.controls.email.value, this.form.controls.password.value)
          .subscribe((data: any) => {
            if (data.state == 'OK') {
              this.loading = false;
              this.authService.saveDataLocalStorage(data.user);
              console.log(data.user);
              this.userService.setAuth(data.user)
              this.router.navigate(['/']);
            } else {
              console.log(data.type);
            }
          });
      });
    }

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

  private getAccessToken(code: string) {
    this.authService.getAccessToken(code)
      .subscribe(data => {
        this.loading = false;
        console.log(data);
      }, error => {
        this.loading = false;
        if (error.status != 0) {
          let response = JSON.parse(error.error.text.replace('{"d":null}', ''));
          if (response.state == 'OK') {
            let email = JSON.parse(response.scope)[0].CORREO;
            this.signupUser = JSON.parse(response.scope)[0];
            console.log(email);
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
