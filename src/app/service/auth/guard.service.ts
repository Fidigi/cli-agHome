import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, NavigationExtras } from '@angular/router';

import { AuthentService } from './authent.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    public auth: AuthentService,
    public router: Router
  ) {
    this.auth.onError
      .subscribe(
        onError => {
          if(onError == true) {
            this.redirect('500',null,true);
          }
        }
      );
  }

  canActivate(route: ActivatedRouteSnapshot|null): boolean {
    const expectedRole = route.data.expectedRole;
    console.log('canActivate');
    if(localStorage.getItem('token') === null){
      this.redirect('403');
      return false;
    } 
    else if(this.auth.currentUser != null) {
      if(expectedRole != null && this.auth.currentUser.hasRole(expectedRole) !== true){
        this.redirect('401');
        return false;
      }
    } 
    return true;
  }

  redirect($route: string, $extras:NavigationExtras = null, absolute: boolean = false){
    console.log("Redirect "+$route);
    if(absolute){
      document.location.href=$route;
    } else {
      this.router.navigate([$route], $extras);
    }
  }
}
