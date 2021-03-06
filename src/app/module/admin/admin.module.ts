import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GuardService } from '../../service/auth/guard.service';

import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ListModule } from './list/list.module';

const routes: Routes = [
  {
    path: 'admin/info',
    component: InfoComponent,
    canActivate: [GuardService], 
    data: { 
      expectedRole: 'ROLE_ADMIN'
    } 
  }
];

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ListModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
