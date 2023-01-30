## Installation
1. Clone/download repo
2. Switch to develop branch
3. `npm install`

## Usage
* `npm run start`
* Server will start at `http://localhost:3000`
* GraphQL endpoint is `http://localhost:3000/graphql`

## Assignment: Graphql
### Description:
* Apollo Server is used in application as a middleware to already existing fastify-based server, that is not prohibited by assignment and author
* GraphQL fetches data from REST API using RESTDataSource
* For your convinience examples of requests are provided in two parts - query and variables
* There is `src/sample-data.ts`, it can be imported and used in `src/app.ts` to add some data on startup for test gql requests. Just uncomment line 4 and 11.
* For readability not only `id` but some simple fields as `firstName` is included in example queries
* In all queries using IDs in variables you have to replace them to actual ones.

### Tasks:
1. Add logic to the restful endpoints (users, posts, profiles, member-types folders in ./src/routes).  
   1.1. `npm run test` - 100%  
   - [x] Done
2. Add logic to the graphql endpoint (graphql folder in ./src/routes).  
Constraints and logic for gql queries should be done based on restful implementation.  
For each subtask provide an example of POST body in the PR.  
All dynamic values should be sent via "variables" field.  
If the properties of the entity are not specified, then return the id of it.  
`userSubscribedTo` - these are users that the current user is following.  
`subscribedToUser` - these are users who are following the current user.  
   
   #### Get gql requests:
   2.1. Get users, profiles, posts, memberTypes - 4 operations in one query.  
   ```
   {
      users {
        id
        firstName
        lastName
        email
        subscribedToUserIds
      }
      profiles {
        id
        avatar
        sex
        birthday
        country
        street
        city
        userId
      }
      posts {
        id
        title
        content
        userId
      }
      memberTypes {
        id
        monthPostsLimit
        discount
      }
   }
   ```
   2.2. Get user, profile, post, memberType by id - 4 operations in one query.  
   ```
   query ($userId: ID!, $profileId:ID!, $postId:ID!, $memberTypeId: ID!) {
      user (id: $userId) {
         id
         firstName
      }
      profile (id: $profileId) {
         id
         avatar
      }
      post (id: $postId) {
         id
         title
      }
      memberType (id: $memberTypeId) {
         id
         monthPostsLimit
      }
   }
   ```
   Example variables:
   ```
   {
      "userId":"550d8113-d76f-4d7d-af55-d3bb342ddbe4",
      "profileId":"495327db-df27-41ab-85ed-190a98b1d168",
      "postId":"3aa3ac6c-bb29-4c0a-b52f-6db9fbdc5210",
      "memberTypeId":"basic"
   }   
   ```    
   
   2.3. Get users with their posts, profiles, memberTypes.  
   ```
   {
      users {
         id
         firstName
         profile {
               id
               avatar
               memberType {
                  id
                  discount
               }
         }
         posts {
               id
               title
         }
      }
   }
   ```
   2.4. Get user by id with his posts, profile, memberType.  
   ```
   query ($userId: ID!) {
      user (id: $userId) {
         id
         firstName
         lastName
         email
         profile {
               id
               avatar
               memberType {
                  id
                  discount
               }
         }
         posts {
               id
               title
         }
      }
   }
   ```   
   Example variables:
   ```
   {
      "userId":"550d8113-d76f-4d7d-af55-d3bb342ddbe4"
   }   
   ```       
   2.5. Get users with their `userSubscribedTo`, profile. 
   ```
   {
      users {
         id
         firstName
         userSubscribedTo {
               id
               firstName
         }
         profile {
            id
            avatar
         }
      }
   }
   ```    
   2.6. Get user by id with his `subscribedToUser`, posts.  
   ```
   query ($userId: ID!) {
      user (id: $userId) {
         id
         firstName
         subscribedToUser {
               id
               firstName
         }
         posts {
               id
               title
         }
      }
   }  
   ```   
   Example variables:
   ```
   {
      "userId":"550d8113-d76f-4d7d-af55-d3bb342ddbe4"
   }   
   ```    
   2.7. Get users with their `userSubscribedTo`, `subscribedToUser` (additionally for each user in `userSubscribedTo`, `subscribedToUser` add their `userSubscribedTo`, `subscribedToUser`). 
   ``` 
   {
      users {
         id
         firstName
         userSubscribedTo {
               id
               firstName
               userSubscribedTo {
                  id
                  firstName
               }
               subscribedToUser {
                  id
                  firstName
               }
         }
         subscribedToUser {
               id
               firstName
               userSubscribedTo {
                  id
                  firstName
               }
               subscribedToUser {
                  id
                  firstName
               }
         }
      }
   }
   ``` 
   #### Create gql requests:
   2.8. Create user.  
   ```
   mutation ($input: CreateUserInput!) {
      createUser(input: $input) {
         id
         firstName
         email
      }
   }
   ```   
   Example variables:
   ```
   {
      "input":{
         "firstName":"fn",
         "lastName":"ln",
         "email":"e@mail"
      }
   }
   ```   
   2.9. Create profile.  
   ```
   mutation ($input: CreateProfileInput!) {
      createProfile(input: $input) {
         id
         avatar
      }
   }
   ```  
   Example variables: 
   ```
   {
      "input":{
         "avatar": "fmq",
         "sex": "s",
         "birthday": 27,
         "country": "b",
         "street": "bel",
         "city": "mmm",
         "memberTypeId": "basic",
         "userId": "564ea653-4648-4181-99d6-71600a553384"
      }
   }   
   ```

   2.10. Create post. 
   ```
   mutation ($input: CreatePostInput!) {
      createPost(input: $input) {
         id
         title
      }
   }    
   ```
   Example variables: 
   ```
   {
      "input":{
         "title": "create title",
         "content": "create content",
         "userId": "9043e1c4-9dbe-4050-877a-0365c2c58b90"
      }
   }   
   ```

   2.11. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs.
   
   - [x] Input Types are described in `src/schema.graphql.ts`, [formats](https://graphql.org/learn/schema/#input-types)
   
   #### Update gql requests:
   2.12. Update user.
   ```  
   mutation ($id: ID!, $input: UpdateUserInput!) {
      updateUser(id:$id, input: $input) {
         id
         firstName
         email
         subscribedToUserIds
      }
   }
   ```  
   Example variables:
   ```
   {
      "id": "aa827335-b2ce-42a7-8efd-c0970e6dc30e",
      "input":{
         "firstName":"fn-new"
      }
   }
   ```    
   2.13. Update profile. 
   ```
   mutation ($id: ID!, $input: UpdateProfileInput!) {
      updateProfile(id: $id, input: $input) {
         id
         avatar
         sex
         birthday
      }
   }    
   ```
   Example variables:
   ```
   {
      "id": "082e852b-2d59-4bd8-b1e3-97f62d39e59e",
      "input":{
         "avatar": "fmq111",
         "sex": "ssdd",
         "birthday": 27
      }
   }   
   ```

   2.14. Update post.  
   ```
   mutation ($id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
         id
         title
      }
   }
   ```
   Example variables:
   ```
   {
      "id": "863e25a6-2722-4f53-a6b4-8759c7280043",
      "input":{
         "title": "create title updated"
      }
   }
   ```
   2.15. Update memberType.  
   ```
   mutation ($id: ID!, $input: UpdateMemberTypeInput!) {
      updateMemberType(id: $id, input: $input) {
         id
         discount
         monthPostsLimit
      }
   }
   ```  
   Example variables:
   ```
   {
      "id": "business",
      "input":{
         "discount": 15
      }
   }
   ```    
   2.16. Subscribe to; unsubscribe from.

   Subscribe  
   ```
   mutation ($id: ID!, $input: SubscribeUserInput!) {
      subscribeUser(id: $id, input: $input) {
         id
         firstName
         subscribedToUser {
            id
            firstName
         }
      }
   }
   ```   
   Unsubscribe
   ```
   mutation ($id: ID!, $input: SubscribeUserInput!) {
      unsubscribeUser(id: $id, input: $input) {
         id
         firstName
         subscribedToUser {
            id
            firstName
         }
      }
   }   
   ```
   Example variables (same structure for both queries)
   ```
   {
      "id": "fb4163bd-cd8c-4524-b8af-3287e4b983e2",
      "input":{
         "userId": "286abd35-bd41-4a73-96c5-fdfcc1bba547"
      }
   }
   ```   

   2.17. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs. 
   
   - [x] See 2.11

3. Solve `n+1` graphql problem with [dataloader](https://www.npmjs.com/package/dataloader) package in all places where it should be used.  
   You can use only one "findMany" call per loader to consider this task completed.  
   It's ok to leave the use of the dataloader even if only one entity was requested. But additionally (no extra score) you can optimize the behavior for such cases => +1 db call is allowed per loader.  
   3.1. List where the dataloader was used with links to the lines of code (creation in gql context and call in resolver).  
   - [x] DataLoader is used in RESTDataSource objects.
   https://github.com/aless133/rs-nodejs-graphql/blob/1801d32d4ac5d0dfcbe478038281c259511fec36/src/datasources/users.rest.ts#L16
   https://github.com/aless133/rs-nodejs-graphql/blob/1801d32d4ac5d0dfcbe478038281c259511fec36/src/datasources/users.rest.ts#L29
   https://github.com/aless133/rs-nodejs-graphql/blob/1801d32d4ac5d0dfcbe478038281c259511fec36/src/datasources/users.rest.ts#L38
   https://github.com/aless133/rs-nodejs-graphql/blob/1801d32d4ac5d0dfcbe478038281c259511fec36/src/datasources/users.rest.ts#L47
   https://github.com/aless133/rs-nodejs-graphql/blob/1801d32d4ac5d0dfcbe478038281c259511fec36/src/datasources/membertypes.rest.ts#L10
   - [x] They are created in Apollo context
   https://github.com/aless133/rs-nodejs-graphql/blob/1801d32d4ac5d0dfcbe478038281c259511fec36/src/apollo.ts#L62-L65
   
4. Limit the complexity of the graphql queries by their depth with [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package.   
   4.1. Provide a link to the line of code where it was used.
   
   - [x] `graphql-depth-limit` is used as validator for GraphQL queries and added to Apollo on creation. Max depth is set to 6.
   (https://github.com/aless133/rs-nodejs-graphql/blob/565db3a690fc166a3c687bba8bf9c055563d50c1/src/apollo.ts#L37)
   
   4.2. Specify a POST body of gql query that ends with an error due to the operation of the rule. Request result should be with `errors` field (and with or without `data:null`) describing the error.  
   - [x] Query example, depth is 7, so we'll get an error
   ```
   {
      users {
         userSubscribedTo {
            userSubscribedTo {
               userSubscribedTo {
                  userSubscribedTo {
                     userSubscribedTo {
                        userSubscribedTo {
                           id
                           firstName
                        }
                     }
                  }
               }
            }
         }
      }
   }
   ```  

