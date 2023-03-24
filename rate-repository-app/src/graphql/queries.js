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