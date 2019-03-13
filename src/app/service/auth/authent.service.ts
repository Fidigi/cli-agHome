import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { ApolloService } from '../apollo.service';
import { ModalService } from '../front/modal.service';

import { LoginMutationGQL } from '../../gql/auth/mutation/LoginMutationGQL';
import { CurrentUserQuery } from '../../gql/auth/query/CurrentUserGQL';
import { UserEntity } from '../../model/user';

import * as Rx from 'rxjs';

export class IQueueCall{
  object : Object;
  methodName : string;
  param : {[key:string]: any};
}

@Injectable({
  providedIn: 'root'
})
export class AuthentService {
  private _onError = new Rx.BehaviorSubject(false);
  private currentCall: IQueueCall;
  private queue: IQueueCall[] = [];
  public currentUser: UserEntity;

  constructor(
    private modalService: ModalService,
    protected apolloService: ApolloService,
    protected apollo: Apollo,
    private loginMutationGQL: LoginMutationGQL,
    private currentUserQuery: CurrentUserQuery
  ) {
    this.queue.splice(0,this.queue.length);
    this.apolloService.is403
      .subscribe(
        is403 => {
          //console.log(is403);
          if(is403 == true) {
            this.recallIfAuth(this.currentCall);
            this.logout();
            let closeOption = {
              conditionToRedirect: '(localStorage.getItem("token") === null)',
              redirect: '/'
            }
            this.modalService.open('login', closeOption);
          } 
        }
      );
    this.apolloService.is500
      .subscribe(
        is500 => {
          if(is500 == true) {
            this.logout();
            this._onError.next(true);
          } 
        }
      );
  }

  get onError() {
    return this._onError.asObservable();
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
        query: this.currentUserQuery.document
      };
      this.apolloService.executePromiseQuery(operation)
      .then(data => {
        //console.log(`received data ${JSON.stringify(data, null, 2)}`);
        if(data) {
          this.currentUser = UserEntity.factoryUser(data.data.userAuth);
          this.recall();
        }
      })
      .catch(error => {
        //console.log(error);
      });
    }
  }

  logout() {
    console.log('Deconnexion');
    localStorage.removeItem('user_uuid');
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  executeAuthentifiedPromise(operation: {[key:string]: any}, object: Object,methodName: string) {
    let httpPromiseMock = Promise.reject({status:'10403',message:'connection close : recallIfAuth'});
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
