import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserQuery extends Query {
  document = gql`
    query{
      userAuth{
        uuid,
        displayName,
        firstname,
        lastname,
        roles
      }
    }
    `;
  }