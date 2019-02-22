import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { UserService } from './user.service';
import { take } from 'rxjs/operators/take';

@Injectable()
export class AuthGuard implements CanActivate {
  
  public user : any;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.user = /* this.userService.getCurrentUser() */"";
    if (this.userService.isAuthenticated.pipe(take(1))){
      this.router.navigate(['/']);  
      console.log("hoa")
    }
    return this.userService.isAuthenticated.pipe(take(1));
  }
}