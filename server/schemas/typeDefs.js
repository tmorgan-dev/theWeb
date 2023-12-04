const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String
    pic: String
    location: String
    bio: String
    gitHub: String
    linkedIn: String
    instagram: String
    stackOverflow: String
    posts: [Post]
    friendCount: Int
    friends: [Friend]
    friendPosts: [Post]

}


type Post {
    _id: ID!
    postText: String
    createdAt: String
    postAuthor: String
    comments: [Comment]
}

input Postinput {
    postText: String!
}

type Comment {
    _id: ID!
    commentText: String!
    commentAuthor: String!
    createdAt: String
}

type Auth {
    token: ID!
    user: User
}
type Friend {
    _id: ID!
    username: String
    friendPosts: [Post]
}

type Friends {
    friendsId: ID
    username: String
    friendPosts: [Post]
}
type FriendUser {
    currentUser: User
    friend: User
}
type Query {
    me: User
    user(username: String!): User
    posts(username: String): Post
    post(postId: ID!): Post
    users: [User]
    friend( _id: ID!, username: String!): Friend
    friends(friendsId: ID!, username: String): Friends
    friendPosts: [Post]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addFriend(username: String, friendsId: ID): FriendUser
    deleteFriend(friendsId: ID!): FriendUser
    addPost(postText: String!): Post
    savedPost(postText: Postinput): User
    deletePost(_id: ID!): User
    addComment(postId: ID!, commentText: String!): Post
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