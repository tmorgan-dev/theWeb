import { gql } from '@apollo/client';

export const QUERY_USER = gql`
	query user {
		user {
			_id
			username
			bio
			gitHub
			linkedIn
			instagram
			stackOverflow
			email
			friendCount
			friends {
				_id
				username
			}
			posts {
				comments {
					commentText
				}
				postAuthor
				createdAt
				postText
			}
			location
			pic
		}
	}
`;

export const ALL_USERS = gql`
	query Query {
		users {
			_id
			username
			email
			pic
			location
			bio
			gitHub
			linkedIn
			instagram
			stackOverflow
			posts {
				_id
				postText
				createdAt
				postAuthor
				comments {
					_id
					commentText
					commentAuthor
					createdAt
				}
			}
			friendCount
			friends {
				_id
				username
				email
				pic
				location
				bio
				gitHub
				linkedIn
				instagram
				stackOverflow
				friendCount
			}
			friendPosts {
				_id
				postText
				createdAt
				postAuthor
			}
		}
	}
`;

export const QUERY_POSTS = gql`
  query getPosts($postText: String!) {
    posts(postText: $postText) {
      _id
      postText
      postAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
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
			gitHub
			linkedIn
			instagram
			stackOverflow
			posts {
				_id
				postText
				createdAt
				postAuthor
				comments {
					_id
					commentText
					commentAuthor
					createdAt
				}
			}
			friends {
				_id
				username
			}
			friendPosts {
				_id
				postText
				createdAt
				postAuthor
				comments {
					_id
					commentText
					commentAuthor
					createdAt
				}
			}
		}
	}
`;