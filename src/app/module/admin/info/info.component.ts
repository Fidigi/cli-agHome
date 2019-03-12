import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConfigService } from 'src/app/service/app-config.service';
import { IAppConfig } from 'src/app/config/app-config';
import { AuthentService } from 'src/app/service/auth/authent.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  env = environment;
  public iAppConfig: IAppConfig = AppConfigService.settings;

  constructor(
    public auth: AuthentService
  ) {}

  ngOnInit() {
  }

}
