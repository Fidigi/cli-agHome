import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentService } from 'src/app/service/auth/authent.service';
import { ModalService } from 'src/app/service/front/modal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public auth: AuthentService,
    private modalService: ModalService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
