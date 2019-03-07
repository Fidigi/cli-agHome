import { Injectable } from '@angular/core';
import { IAppConfig, APP_CONFIG } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  static settings: IAppConfig;

  constructor() {}

  load() {
    AppConfigService.settings = <IAppConfig>APP_CONFIG;
    //console.log('load config');
  }

  getConfig(iAppConfig: IAppConfig, module: string) {
    //console.log(module+" wanted");
    if(module == "all"){
      return iAppConfig;
    }
    if(iAppConfig.hasOwnProperty((module)) != false){
      return iAppConfig[module];
    } else {
      return null;
    }
  }
}
