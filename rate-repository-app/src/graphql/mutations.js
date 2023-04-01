import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
    mutation authenticate($credentials: AuthenticateInput!) {
        authenticate(
            credentials: $credentials
        ){
            accessToken
        }
    }
`

export const CREATE_NEW_USER = gql `
    mutation createUser($username: String!, $password: String!){
        createUser(user:{
            username: $username,
            password: $password
        }){
            username
        }
    }
`

export const CREATE_REVIEW = gql `
    mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String!){
        createReview(review:{
                repositoryName: $repositoryName,
                ownerName: $ownerName,
                rating: $rating,
                text: $text,
        }
        ){
            createdAt
            text
            user{
                username
            }
            repositoryId
        }
    }
`

export const DELETE_REVIEW = gql `
    mutation deleteReview($id: ID!){
        deleteReview(id: $id)
    }
`