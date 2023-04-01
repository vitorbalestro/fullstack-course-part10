import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }  
`

export const GET_REPOSITORY = gql `
  query getRepository($id: ID!, $first: Int, $after: String){
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo{
          endCursor
          startCursor
          hasNextPage
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