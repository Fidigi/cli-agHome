import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GuardService } from '../../service/auth/guard.service';

import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'admin/info',
    component: InfoComponent,
    canActivate: [GuardService], 
    data: { 
      expectedRole: 'ROLE_ADMIN'
    } 
  },
  {
    path: 'admin/lists',
    component: ListComponent,
    canActivate: [GuardService], 
    data: { 
      expectedRole: 'ROLE_ADMIN'
    } 
  }
];

@NgModule({
  declarations: [
    InfoComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
