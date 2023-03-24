import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName,
          language,
          reviewCount,
          stargazersCount,
          ratingAverage,
          description,
          forksCount,
          ownerAvatarUrl,
          id
        }
      }
    }
  }  
`

export const GET_USER_REVIEWS = gql`
  query {
    me {
      username
      reviews {
        totalCount
        edges {
          cursor
          node {
            rating
            text
            user{
              username
            }
            repository{
              fullName
              description
              ownerAvatarUrl
            }
          }
        }
      }
    }
  }
`