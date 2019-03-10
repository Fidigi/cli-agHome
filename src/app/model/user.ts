import { EntityBase } from './entity-base';
import { Token } from './token';

export class User {
  uuid : string;
  displayName : string;
  /* attribut facultatif */
  firstName? : string;
  lastName? : string;
  roles? : [string];
  tokens? : [Token];
}

export class UserEntity extends User {

  hasRole(role: string): boolean{
    if(this.roles.find(elem => elem === role) != null){
      return true;
    }
    return false;
  }

  static factoryUser (user: User): UserEntity{
    return EntityBase.factory(new UserEntity(), user);
  }

}