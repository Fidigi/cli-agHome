import gql from 'graphql-tag';

export const CurrentUserQuery = gql`query{
    userAuth{
        uuid,
        displayName,
        firstname,
        lastname,
        roles
    }
}`;