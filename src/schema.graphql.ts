export default `#graphql
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  subscribedToUserIds: [String]!
  subscribedToUser: [User],
  userSubscribedTo: [User],
  profile: Profile
  posts: [Post]
}

input CreateUserInput {
  firstName: String!
  lastName: String!
  email: String!
}

input UpdateUserInput {
  firstName: String
  lastName: String
  email: String
}

type Profile {
  id: ID!  
  avatar: String!
  sex: String!
  birthday: Int!
  country: String!
  street:String!
  city:String!
  userId: String!
  memberTypeId: String!
  memberType: MemberType
}

input CreateProfileInput {
  avatar: String!
  sex: String!
  birthday: Int!
  country: String!
  street: String!
  city: String!
  userId: String!
  memberTypeId: String!
}

input UpdateProfileInput {
  avatar: String
  sex: String
  birthday: Int
  country: String
  street: String
  city: String
  memberTypeId: String
}

type Post {
  id: ID!
  title: String!
  content: String!
  userId: String!
}

input CreatePostInput {
  title: String!
  content: String!
  userId: String!
}

input UpdatePostInput {
  title: String
  content: String
}

type MemberType {
  id: String!
  discount: Int
  monthPostsLimit: Int
}

input UpdateMemberTypeInput {
  discount: Int
  monthPostsLimit: Int
}

type Query {
  time: String
  users: [User]
  user (id: ID!): User
  profiles: [Profile]
  profile (id: ID!): Profile
  posts: [Post]
  post (id: ID!): Post
  memberTypes: [MemberType]
  memberType (id: ID!): MemberType
}

type Mutation {
  createUser(input: CreateUserInput!): User
  updateUser(id: ID!, input: UpdateUserInput!): User
  createProfile(input: CreateProfileInput!): Profile
  updateProfile(id: ID!, input: UpdateProfileInput!): Profile
  createPost(input: CreatePostInput!): Post
  updatePost(id: ID!, input: UpdatePostInput!): Post
  updateMemberType(id: ID!, input: UpdateMemberTypeInput!): MemberType
}
`;
