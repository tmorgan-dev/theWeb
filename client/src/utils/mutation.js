import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation createUser(
		$username: String!
		$email: String!
		$password: String!
	) {
		createUser(
			username: $username
			email: $email
			password: $password
		) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_POST = gql`
	mutation addPost($postText: String!) {
		addPost(postText: $postText) {
			_id
			postText
			postAuthor
			createdAt
			comments {
				_id
				commentText
			}
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addComment($postId: ID!, $commentText: String!) {
		addComment(postId: $postId, commentText: $commentText) {
			_id
			postText
			postAuthor
			createdAt
			comments {
				_id
				commentText
				createdAt
			}
		}
	}
`;

export const ADD_FRIEND = gql`
	mutation addFriend($username: String!, $friendsId: ID) {
		addFriend($username: $username, $friendsId: $friendsId) {
			friendsId
			username
		}
	}
`;
