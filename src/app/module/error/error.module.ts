import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotAuthentifiedComponent } from './not-authentified/not-authentified.component';

const routes: Routes = [
  {
    path: '401',
    component: NotAuthorizedComponent
  },
  {
    path: '403',
    component: NotAuthentifiedComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    NotFoundComponent, 
    NotAuthorizedComponent, 
    NotAuthentifiedComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule,
    NotFoundComponent, 
    NotAuthorizedComponent, 
    NotAuthentifiedComponent
  ]
})
export class ErrorModule { }
