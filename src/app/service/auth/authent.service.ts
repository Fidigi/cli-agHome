import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { ApolloService } from '../apollo.service';

import { LoginMutationGQL } from '../../gql/mutation/LoginMutationGQL';
import { CurrentUserQuery } from '../../gql/query/CurrentUserGQL';
import { User } from '../../model/user';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentService {
  private _isAuthenticated = new Rx.BehaviorSubject(false);
  currentUser: User;

  constructor(
    protected apolloService: ApolloService,
    protected apollo: Apollo,
    protected loginMutationGQL: LoginMutationGQL
  ) { }

  authenticate(user: any){
    const operation = {
      query: this.loginMutationGQL.document,
      variables: {username: user.username,password: user.password}
    };
    return this.apolloService.executePromiseQuery(operation);
  }

  saveUserData(data: any) {
    localStorage.setItem('user_uuid',data.user.uuid);
    localStorage.setItem('token',data.token);
    this.load();
  }

  setCurrentUser(data) {
    this.currentUser = data;
    this._isAuthenticated.next(true);
  }

  get isAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  haveRole(role: string): boolean{
      if(this.currentUser.roles.find(elem => elem === role) != null){
          return true;
      }
      return false;
  }

  load() {
    //console.log('test loading current user');
    if(localStorage.getItem('token') != null){
      //console.log('loading current user');
      const operation = {
        query: CurrentUserQuery
      };
      this.apolloService.executePromiseQuery(operation)
      .then(data => {
        //console.log(`received data ${JSON.stringify(data, null, 2)}`);
        this.setCurrentUser(data.data.userAuth);
        //console.log('loaded current user');
      })
      .catch(error => {
        console.log(`load user received error ${error}`);
      });
    }
  }

  logout() {
    console.log('Tentative de déconnexion');
    localStorage.removeItem('user_uuid');
    localStorage.removeItem('token');
    //console.log(localStorage);
    this.currentUser = null;
    this._isAuthenticated.next(false);
  }
}
