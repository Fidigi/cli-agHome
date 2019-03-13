import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class LoginMutationGQL extends Mutation {
  document = gql`mutation signin($username: String!, $password: String!, $remember: Boolean!) {
      signin(crendentials:{ username:$username, password:$password, remember:$remember }) {
          token
          user{
              uuid
          }
      }
  }`;
}