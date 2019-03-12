import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ListsQuery extends Query {
  document = gql`
    query{
        listList{
            lists{
                id
                tag
                label
                value
            }
        }
    }
    `;
  }