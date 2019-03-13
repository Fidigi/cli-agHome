import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ListsQuery } from 'src/app/gql/admin/list/query/ListsGQL';
import { ListsActionGQL } from 'src/app/gql/admin/list/mutation/ListsActionGQL';
import { AuthentService } from 'src/app/service/auth/authent.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {
  listForm: FormGroup;
  error: string = '';
  public selectedList: any;

  returnUrl: string = '/admin/lists';
  private selectedListTag = (this.route.snapshot.paramMap.get("tag") !== '0')? this.route.snapshot.paramMap.get("tag") : null;
  actionLabel = (this.selectedListTag)? 'Update' : 'Create';

  constructor(
    private auth: AuthentService,
    private listsQuery: ListsQuery,
    private listsActionGQL: ListsActionGQL,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    if(this.selectedListTag !== null){
      const operation = {
        query: this.listsQuery.document,
        variables: { tag: this.selectedListTag }
      };
      this.requestData(operation);
    } else {
      this.listForm = this.formBuilder.group({
        'tag': [''],
        'label': ['', Validators.required],
        'values': this.formBuilder.array([this.buildItem()], Validators.required)
      });
    }
  }

  //get formData() { return this.listForm.get('values') }

  onSubmit() {
    console.log(this.listForm.value);
    const operation = {
      query: this.listsActionGQL.document,
      variables: this.listForm.value
    };
    this.registerData(operation);
  }

  addNewItem(id: number = 0, val: string = '') {
    (this.listForm.get('values') as FormArray).push(this.buildItem(id, val));
  }

  buildItem(id: number = 0, val: string = '') {
    return new FormGroup({
      'id': new FormControl(id, Validators.required),
      'value': new FormControl(val, Validators.required)
    })
  }
  
  requestData(operation){
    this.auth.executeAuthentifiedPromise(operation,this,'requestData')
    .then(data => {
      //console.log(`received data ${JSON.stringify(data, null, 2)}`);
      if(data) {
        this.selectedList = data.data.listList.lists
        //console.log(this.selectedList);
        this.listForm = this.formBuilder.group({
          'tag': [this.selectedList[0].tag],
          'label': [this.selectedList[0].label, Validators.required],
          'values': this.formBuilder.array(
            [this.buildItem(
              this.selectedList[0].id,
              this.selectedList[0].value
            )], 
            Validators.required
          )
        });
        this.selectedList.forEach((element, index) => {
          if(index > 0){
            this.addNewItem(element.id, element.value);
          }
        });
      }
    })
    .catch(error => {
      if(error.status != '10403'){
        this.router.navigate(['/admin/lists']);
        console.log(error);
      }
    });
    return true;
  }
  
  registerData(operation){
    this.auth.executeAuthentifiedPromise(operation,this,'registerData')
    .then(data => {
      //console.log(`received data ${JSON.stringify(data, null, 2)}`);
      if(data.data) {
        console.log(data.data);
      } 
      if(data.errors) {
        data.errors.forEach((e) => {
          console.log(e);
        });
      }
    })
    .catch(error => {
      if(error.status != '10403'){
        console.log(error);
        this.router.navigate(['/admin/lists']);
      }
    });
    return true;
  }

}
