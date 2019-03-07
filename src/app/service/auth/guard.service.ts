import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';

import { AuthentService } from './authent.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    public auth: AuthentService, 
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot|null): boolean {
    const expectedRole = route.data.expectedRole;
    //console.log(expectedRole);
    this.auth.isAuthenticated
      .pipe(distinctUntilChanged())
      .subscribe(isAuthenticated => {
        if(isAuthenticated == true) {
          if(expectedRole != null && this.auth.haveRole(expectedRole) !== true){
            //console.log('401');
            this.router.navigate(['401']);
            return false;
          } else {
            return true;
          }
        }
      });
    if(localStorage.getItem('token') === null){
      //console.log('403');
      this.router.navigate(['403']);
      return false;
    }
    return true;
  }
}
