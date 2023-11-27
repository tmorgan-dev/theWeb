const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String
    friendCount: Int
    savedPost: [ Post ]
    savedComment: [ Comment ]
}

type Post {
    _id: ID!
    postText: String
}

input Postinput {
    postText: String!
}

type Comment {
    _id: ID!
    comment: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    users: [User]
    
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addFriend(username: String!): User
    deleteFriend(_id: ID!): User
    savedPost(postText: Postinput): User
    deletePost(_id: ID!): User
    savedComment(_id: ID!): User
    deleteComment(_id: ID!): User
  }
`;

module.exports = typeDefs

// savedReaction: [ Reaction ]

// type Reaction {
//     _id: ID!
//     image: String
// }

// savedReaction(_id: ID!): User
// deleteReaction(_id: ID!): User