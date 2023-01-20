export default `#graphql
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  profile: Profile
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
}

type Query {
  test: String
  users: [User]
  profiles: [Profile]
}
`;
