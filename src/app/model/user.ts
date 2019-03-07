export class User {
    uuid : string;
    displayName : string;
    /* attribut facultatif */
    firstName? : string;
    lastName? : string;
    roles? : [string];
}
