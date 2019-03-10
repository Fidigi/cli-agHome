import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { ApolloService } from '../apollo.service';
import { ModalService } from '../front/modal.service';

import { LoginMutationGQL } from '../../gql/auth/mutation/LoginMutationGQL';
import { CurrentUserQuery } from '../../gql/auth/query/CurrentUserGQL';
import { User } from '../../model/user';
import { forEach } from '@angular/router/src/utils/collection';

export class IQueueCall{
  object : Object;
  methodName : string;
  param : {[key:string]: any};
}

@Injectable({
  providedIn: 'root'
})
export class AuthentService {
  currentUser: User;
  currentCall: IQueueCall;
  private queue: IQueueCall[] = [];

  constructor(
    public modalService: ModalService,
    protected apolloService: ApolloService,
    protected apollo: Apollo,
    protected loginMutationGQL: LoginMutationGQL
  ) {
    this.queue.splice(0,this.queue.length);
    this.apolloService.is403
      .subscribe(
        isExpired => {
          //console.log(isExpired);
          if(isExpired == true) {
            this.recallIfAuth(this.currentCall);
            this.logout();
            this.modalService.open('login');
          } 
        }
      );
  }

  authenticate(credentials: any){
    const operation = {
      query: this.loginMutationGQL.document,
      variables: { username: credentials.username, password: credentials.password, remember: credentials.remember}
    };
    return this.apolloService.executePromiseQuery(operation);
  }

  saveUserData(data: any) {
    localStorage.setItem('user_uuid',data.user.uuid);
    localStorage.setItem('token',data.token);
    this.load();
  }

  load() {
    if(localStorage.getItem('token') != null){
      const operation = {
        query: CurrentUserQuery
      };
      this.apolloService.executePromiseQuery(operation)
      .then(data => {
        //console.log(`received data ${JSON.stringify(data, null, 2)}`);
        if(data) {
          this.currentUser = data.data.userAuth;
          this.recall();
        }
      })
      .catch(error => {
        //console.log(error);
      });
    }
  }

  hasRole(role: string): boolean{
    if(this.currentUser.roles.find(elem => elem === role) != null){
        return true;
    }
    return false;
  }

  logout() {
    console.log('Deconnexion');
    localStorage.removeItem('user_uuid');
    localStorage.removeItem('token');
    //console.log(localStorage);
    this.currentUser = null;
  }

  executeAuthentifiedPromise(operation: {[key:string]: any}, object: Object,methodName: string) {
    let httpPromiseMock = Promise.reject('connection close');
    httpPromiseMock.then((val) => val).catch((val) => val);

    if(this.currentUser != null){
      this.currentCall = {
        object : object,
        methodName : methodName,
        param: operation,
      };
      return this.apolloService.executePromiseQuery(operation);
    } else {
      this.recallIfAuth({
        object : object,
        methodName : methodName,
        param: operation,
      });
      return httpPromiseMock;
    }
  }

  private recallIfAuth(recall: IQueueCall) {
    this.queue.push(recall);
  }

  private recall() {
    //console.log('recall '+this.queue.length);
    this.queue.forEach(function(element, index) {
      if(element){
        //console.log('recall '+index+' '+element.methodName);
        element.object[element.methodName](element.param);
      }
    });
    this.queue.splice(0,this.queue.length);
  }
}
