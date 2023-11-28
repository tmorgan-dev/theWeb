//pending queries for user
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pic
      location
      bio
      posts {
        _id
        postText
        createdAt
        postAuthor
      }
      friends {
        _id
        username
      }
    }
  }
`;

// export const QUERY_POSTS = gql`
//   query getPosts {
//     thoughts {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//     }
//   }
// `;

export const QUERY_COMMENTS = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      pic
      location
      bio
      posts {
        _id
        postText
        createdAt
        postAuthor
      }
      friends {
        _id
        username
      }
    }
  }
`;
