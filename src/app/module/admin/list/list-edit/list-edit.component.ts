import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {
  formBuilder: FormBuilder
  listForm: FormGroup;
  error: string = '';

  returnUrl: string = '/admin/lists';
  private selectedListId = (this.route.snapshot.paramMap.get("tag") !== '0')? this.route.snapshot.paramMap.get("tag") : null;
  actionLabel = (this.selectedListId)? 'Update' : 'Create';

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.listForm = this.formBuilder.group({
      'label': ['', Validators.required],
      'values': this.formBuilder.array([this.buildItem('')], Validators.required)
    });
  }

  //get formData() { return this.listForm.get('values') }

  onSubmit() {
    console.log(this.listForm.value);
  }

  addNewItem() {
    (this.listForm.get('values') as FormArray).push(this.buildItem(''));
  }

  buildItem(val: string) {
    return new FormGroup({
      id: new FormControl(0, Validators.required),
      value: new FormControl('', Validators.required)
    })
  }

}
