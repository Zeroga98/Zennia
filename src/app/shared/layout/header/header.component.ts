import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services';

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
    router: Router,
    private authService: AuthService
  ) { 
    router.events.subscribe((val) => {
      this.route = ((location.path() != '')? location.path(): 'Home');
      this.is_invited = this.route.indexOf("login") != -1;
    });
    this.authService.$user.subscribe(user => this.user = user); 
  }

  ngOnInit() {

  }

  public logout(){
    this.authService.logout();
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
