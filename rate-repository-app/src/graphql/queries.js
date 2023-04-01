import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword
    ){
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

export const GET_REPOSITORY = gql `
  query getRepository($id: ID!){
    repository(
      id: $id
    ){
      fullName,
      language,
      reviewCount,
      stargazersCount,
      ratingAverage,
      description,
      forksCount,
      ownerAvatarUrl,
      url,
      reviews {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            user {
              id,
              username
            }
          }
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
            createdAt
            user{
              username
            }
            repositoryId
            id
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