import { Component } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { AuthService, UserService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
  	private authService: AuthService,
  	private userService: UserService
  	){
  	if(this.authService.isAuth()){
  		this.userService.getUser(this.authService.getUserLocalStorage().CORREO)
  		.subscribe(data => this.userService.setUserCurrent(data));
  		
  		this.authService.setUser(this.authService.getUserLocalStorage());
  	}
  }
}
