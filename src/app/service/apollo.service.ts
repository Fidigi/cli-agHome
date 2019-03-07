import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from "apollo-link-context";

import { execute, makePromise } from 'apollo-link';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(
    protected apollo: Apollo,
    protected httpLink: HttpLink
  ) { }

  executeQuery(operation){
    const http = this.httpLink.create({
      //uri: 'http://127.0.0.1:8000/graphql/'
      uri: 'http://192.168.1.17:8000/graphql/'
    });

    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
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
    return makePromise(this.executeQuery(operation));
  }
}
