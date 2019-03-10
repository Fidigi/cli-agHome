export class EntityBase {

    public static factory(object: Object, data: Object) : any {
      Object.entries(data).forEach(function(element) {
        object[element[0]] = element[1];
      });
      return object;
    };
    
  }