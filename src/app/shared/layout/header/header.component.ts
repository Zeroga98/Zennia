import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { UserService, AuthService } from '../../../shared/services';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  public route: string;
  public user: any;
  public is_invited: boolean;

  constructor(
    location: Location,
    private router: Router,
    private userService: UserService,
    private authService: AuthService

  ) { 
    router.events.subscribe((val) => {
      this.route = ((location.path() != '')? location.path(): 'Home');
      this.is_invited = this.route.indexOf("login") != -1;
    });
    this.userService.$userCurrent.subscribe(user => this.user = user); 
  }

  ngOnInit() {

  }

  public logout(){
    this.userService.purgeAuth();
    this.authService.logout();
    this.userService.purgeAuth();
    this.router.navigateByUrl('/login');
  }
 
  onHidden(): void {
    console.log('Dropdown is hidden');
  }

  onShown(): void {
    console.log('Dropdown is shown');
  }

  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

}
