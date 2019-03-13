import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ListsActionGQL extends Mutation {
  document = gql`
  mutation list_action($tag: String, $label: String!, $values: [ListType]) {
    list_action(list:{tag:$tag,label:$label,values:$values}){
      lists{
        id
        tag
        label
        value
      }
    }
  }`;
}