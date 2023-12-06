require("dotenv");
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || "WIPWIPNAYNAY";
const expiration = process.env.EXPIRATION || "2h";

// const secret = 'WIPWIPNAYNAY';
// const expiration = '2h';

module.exports = {
	AuthenticationError: new GraphQLError(
		'Could not authenticate user.',
		{
			extensions: {
				code: 'UNAUTHENTICATED',
			},
		}
	),
	authMiddleware: function ({ req }) {
		let token =
			req.body.token ||
			req.query.token ||
			req.headers.authorization;
	
		if (req.headers.authorization) {
			token = token.split(' ').pop().trim();
		}
	
		if (!token) {
			return req;
		}
	
		try {
			const { data } = jwt.verify(token, secret, {
				maxAge: expiration,
			});
			req.user = data;
		} catch (error) {
			console.error('Error verifying token:', error.message);
		}
	
		return req;
	},
	signToken: function ({ email, username, _id }) {
		const payload = { email, username, _id };
		return jwt.sign({ data: payload }, secret, {
			expiresIn: expiration,
		});
	},
};
