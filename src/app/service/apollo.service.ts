import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from "apollo-link-context";

import * as Rx from 'rxjs';

import { execute, makePromise } from 'apollo-link';
import { AuthentService } from './auth/authent.service';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  private _is403 = new Rx.BehaviorSubject(false);
  private _is404 = new Rx.BehaviorSubject(false);
  private _is500 = new Rx.BehaviorSubject(false);
  private _onError = new Rx.BehaviorSubject(false);
  private stopRequest: boolean = false;

  constructor(
    protected apollo: Apollo,
    protected httpLink: HttpLink
  ) {
    this.onError
      .subscribe(
        error => {
          //console.log(isExpired);
          if(error == true) {
            this.stopRequest = true;
          } 
        }
      );
  }

  private executeQuery(operation){
    const http = this.httpLink.create({
      //uri: 'http://127.0.0.1:8000/graphql/'
      uri: 'http://192.168.1.17:8000/graphql/'
    });

    const auth = setContext((_, { headers }) => {
      let token = localStorage.getItem('token');
      if (!headers) headers = new HttpHeaders();
      if (!token) { return {}; }
      else {
        return {
          headers: headers.append('X-AUTH-TOKEN', `${token}`)
        };
      }
    });

    let linkHttp = null;

    if( localStorage.getItem('token') != null){
      linkHttp = auth.concat(http);
    } else {
      linkHttp = http;
    }

    return execute(linkHttp,operation);
  }

  /*const operation = {
    query: gql`query { hello }`,
    variables: {} //optional
    operationName: {} //optional
    context: {} //optional
    extensions: {} //optional
  };*/

  executePromiseQuery(operation){
    let result = makePromise(this.executeQuery(operation))
      .catch(error => {
        //console.log(error);
        this.propagateError(error.status);
      });

    return result;
  }

  resetStatus(){
    this._is403.next(false);
    this._is404.next(false);
    this._is500.next(false);
    this._onError.next(false);
  }

  propagateError(status: number){
    switch (status) {
      case 403:
        this._is403.next(true);
        break;
      case 404:
        this._is404.next(true);
        break;
      case 500:
        this._is500.next(true);
        break;
      default:
        console.log('Sorry, ' + status + ' no propagate handler.');
    }
    this._onError.next(true);
  }

  get is403() {
    return this._is403.asObservable();
  }

  get is404() {
    return this._is404.asObservable();
  }

  get is500() {
    return this._is500.asObservable();
  }

  get onError() {
    return this._onError.asObservable();
  }
}
