import { Component, OnInit } from '@angular/core';

import { AuthentService } from 'src/app/service/auth/authent.service';

import { ListsQuery } from 'src/app/gql/admin/list/query/ListsGQL';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public lists: any[];
  public aListsTag: any[any];
  public selectedList: any;
  public selectedListEdit: any;

  constructor(
    private auth: AuthentService,
    private listsQuery: ListsQuery
  ) { }

  ngOnInit() {
    const operation = {
      query: this.listsQuery.document,
      variables: { tag: "" }
    };
    this.requestData(operation);
  }
  
  requestData(operation){
    //console.log('requestData');
    this.auth.executeAuthentifiedPromise(operation,this,'requestData')
    .then(data => {
      //console.log(`received data ${JSON.stringify(data, null, 2)}`);
      if(data) {
        this.lists = data.data.listList.lists;
        //console.log(this.lists);
        this.lists.forEach((e, i) => { 
          if( this.aListsTag === undefined ){
            this.aListsTag = [{tag: e.tag,label: e.label,values:[{id:e.id,value:e.value}]}];
          } else {
            let tag = this.aListsTag.find((e2)=>{
              if(e2.tag === e.tag){ return this; }
            });
            if(tag === undefined){
              this.aListsTag.push({tag: e.tag,label: e.label,values:[{id:e.id,value:e.value}]}); 
            } else {
              tag.values.push({id:e.id,value:e.value});
            }
          }
        });
        this.selectedList = this.aListsTag[0];
        this.selectedListEdit = this.aListsTag[0];
        console.log(this.aListsTag);
      }
    })
    .catch(error => {
      console.log(error);
    });
    return true;
  }

  onSelect(list: any) {
    this.selectedList = list;
  }
}




