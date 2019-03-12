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
  lists: any[];

  constructor(
    private auth: AuthentService,
    private listsQuery: ListsQuery
  ) { }

  ngOnInit() {
    const operation = {
      query: this.listsQuery.document
    };
    this.requestData(operation);
  }
  
  requestData(operation){
    //console.log('requestData');
    this.auth.executeAuthentifiedPromise(operation,this,'requestData')
    .then(data => {
      //console.log(`received data ${JSON.stringify(data, null, 2)}`);
      if(data) {
        this.lists = data.data;
        console.log(data.data);
      }
    })
    .catch(error => {
      console.log(error);
    });
    return true;
  }
}


