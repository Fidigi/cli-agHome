import { Component, OnInit } from '@angular/core';

import { AuthentService } from 'src/app/service/auth/authent.service';

import { CurrentUserQuery } from 'src/app/gql/admin/list/query/ListsGQL';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  lists: any[];

  constructor(
    private auth: AuthentService
  ) { }

  ngOnInit() {
    /*const operation = {
      query: CurrentUserQuery
    };
    this.requestData(operation);*/
  }
  
  requestData(operation){
    //console.log('requestData');
    this.auth.executeAuthentifiedPromise(operation,this,'requestData')
    .then(data => {
      //console.log(`received data ${JSON.stringify(data, null, 2)}`);
      if(data) {
        //console.log(data)
      }
    })
    .catch(error => {
      console.log(error);
    });
    return true;
  }
}
