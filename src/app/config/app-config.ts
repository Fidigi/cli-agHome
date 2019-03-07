export class IAppConfig{
  id : string;
  name : string;
  /* attribut facultatif */
  //apollo: {attr:value,attr2:value}
  apollo? : {[key:string]: string};
  //wordings: {component:{attr:value,...},...,componentN:{attr:value,...}}
  wordings? : {[key:string]: {[key:string]: string}};
}

export const APP_CONFIG: IAppConfig = {
  "id": "1",
  "name": "Ag-Home",
  /*
  wordings: {module:{attr:value,...},...,moduleN:{attr:value,...}}
  */
  "wordings": {
    "common" : {
      "title" : "cli-agHome",
      "author" : "Arnaud LAURENT"
    },
    "home" : {
      "title" : "HomePage"
    }
  }
};
