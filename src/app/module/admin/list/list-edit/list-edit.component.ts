import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {
  
  private listForm: FormGroup;
  error: string = '';

  private returnUrl: string = '/admin/lists';
  private selectedListId = (this.route.snapshot.paramMap.get("tag") !== '0')? this.route.snapshot.paramMap.get("tag") : null;
  private actionLabel = (this.selectedListId)? 'Update' : 'Create';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.listForm = this.formBuilder.group({
      'label': ['', Validators.required],
      'values': this.formBuilder.array([this.buildItem('')], Validators.required)
    });
  }

  onSubmit() {
    console.log(this.listForm.value);
  }

  buildItem(val: string) {
    return new FormGroup({
      id: new FormControl(0, Validators.required),
      value: new FormControl('', Validators.required)
    })
  }

}
