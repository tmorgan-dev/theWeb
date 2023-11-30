//pending queries for user
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
	query user {
		user {
			_id
			username
			bio
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
	query users {
		users {
			_id
			username
			bio
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


export const QUERY_POSTS = gql`
	query getPosts {
		post {
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
