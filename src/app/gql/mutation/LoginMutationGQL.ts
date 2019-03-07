import { Injectable } from '@angular/core';
import { Query, Mutation } from 'apollo-angular';

import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class LoginMutationGQL extends Mutation {
  document = gql`mutation signin($username: String!, $password: String!) {
    signin(crendentials:{username:$username,password:$password}) {
        token
        user{
          uuid
        }
      }
    }`;
}