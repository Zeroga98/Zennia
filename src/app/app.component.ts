import { Component } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { AuthService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService){
  	if(this.authService.isAuth())
  		this.authService.setUser(this.authService.getUserLocalStorage());
  }
}
