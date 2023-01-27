export default `#graphql
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  profile: Profile
  posts: [Post]
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

type Post {
  id: ID!
  title: String!
  content: String!
  userId: String!
}

type MemberType {
  id: ID!
  discount: Int
  monthPostsLimit: Int
}

type Query {
  test: String
  users: [User]
  user (id: ID!): User
  profiles: [Profile]
  profile (id: ID!): Profile
  posts: [Post]
  post (id: ID!): Post
  memberTypes: [MemberType]
  memberType (id: ID!): MemberType
}
`;
