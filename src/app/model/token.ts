import { User } from './user';

export class Token {
    token? : string;
    type? : string;
    expired? : boolean;
    user? : User;
}
