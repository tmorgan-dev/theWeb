const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String
    friendCount: Int
    savedPost: [ Post ]
    savedComment: [ Comment ]
    savedReaction: [ Reaction ]
}

type Post {
    _id: ID!
    post: String
}

type Comment {
    _id: ID!
    comment: String
}

type Reaction {
    _id: ID!
    image: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): Auth
    addFriend(username: String!): User
    deleteFriend(_id: ID!): User
    savedPost(username: String!): User
    deletePost(_id: ID!): User
    savedComment(_id: ID!): User
    deleteComment(_id: ID!): User
    savedReaction(_id: ID!): User
    deleteReaction(_id: ID!): User
  }
`

module.exports = typeDefs