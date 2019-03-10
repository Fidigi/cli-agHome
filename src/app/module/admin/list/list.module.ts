import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GuardService } from 'src/app/service/auth/guard.service';

import { ListsComponent } from './lists/lists.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListEditComponent } from './list-edit/list-edit.component';

const routes: Routes = [
  {
    path: 'admin/lists',
    component: ListsComponent,
    canActivate: [GuardService], 
    data: { 
      expectedRole: 'ROLE_ADMIN'
    } 
  },
  {
    path: 'admin/list/:tag',
    component: ListEditComponent,
    canActivate: [GuardService], 
    data: { 
      expectedRole: 'ROLE_ADMIN'
    } 
  }
];

@NgModule({
  declarations: [
    ListsComponent,
    ListDetailComponent,
    ListEditComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class ListModule { }