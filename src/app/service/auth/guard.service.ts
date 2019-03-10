import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

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
    console.log('canActivate');
    if(localStorage.getItem('token') === null){
      this.redirect('403');
      return false;
    } 
    else if(this.auth.currentUser != null) {
      if(expectedRole != null && this.auth.hasRole(expectedRole) !== true){
        this.redirect('401');
        return false;
      }
    } 
    return true;
  }

  redirect($route: string, $option = null, absolute: boolean = false){
    console.log("Redirect "+$route);
    if(absolute){
      document.location.href=$route;
    } else {
      this.router.navigate([$route]);
    }
  }
}
