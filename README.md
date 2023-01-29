## Assignment: Graphql
### Tasks:
1. Add logic to the restful endpoints (users, posts, profiles, member-types folders in ./src/routes).  
   1.1. npm run test - 100%  
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
      "userId":"550d8113-d76f-4d7d-af55-d3bb342ddbe4",
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
               profile {
                  id
                  avatar
               }
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
         "firstName":"fn-new",
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
   2.17. [InputObjectType](https://graphql.org/graphql-js/type/#graphqlinputobjecttype) for DTOs.  

3. Solve `n+1` graphql problem with [dataloader](https://www.npmjs.com/package/dataloader) package in all places where it should be used.  
   You can use only one "findMany" call per loader to consider this task completed.  
   It's ok to leave the use of the dataloader even if only one entity was requested. But additionally (no extra score) you can optimize the behavior for such cases => +1 db call is allowed per loader.  
   3.1. List where the dataloader was used with links to the lines of code (creation in gql context and call in resolver).  
4. Limit the complexity of the graphql queries by their depth with [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package.   
   4.1. Provide a link to the line of code where it was used. (https://github.com/aless133/rs-nodejs-graphql/blob/565db3a690fc166a3c687bba8bf9c055563d50c1/src/apollo.ts#L37)
   
   4.2. Specify a POST body of gql query that ends with an error due to the operation of the rule. Request result should be with `errors` field (and with or without `data:null`) describing the error.  
   Query example
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

### Description:  
All dependencies to complete this task are already installed.  
You are free to install new dependencies as long as you use them.  
App template was made with fastify, but you don't need to know much about fastify to get the tasks done.  
All templates for restful endpoints are placed, just fill in the logic for each of them.  
Use the "db" property of the "fastify" object as a database access methods ("db" is an instance of the DB class => ./src/utils/DB/DB.ts).  
Body, params have fixed structure for each restful endpoint due to jsonSchema (schema.ts files near index.ts).  

### Description for the 1 task:
If the requested entity is missing - send 404 http code.  
If operation cannot be performed because of the client input - send 400 http code.  
You can use methods of "reply" to set http code or throw an [http error](https://github.com/fastify/fastify-sensible#fastifyhttperrors).  
If operation is successfully completed, then return an entity or array of entities from http handler (fastify will stringify object/array and will send it).  

Relation fields are only stored in dependent/child entities. E.g. profile stores "userId" field.  
You are also responsible for verifying that the relations are real. E.g. "userId" belongs to the real user.  
So when you delete dependent entity, you automatically delete relations with its parents.  
But when you delete parent entity, you need to delete relations from child entities yourself to keep the data relevant.   
(In the next rss-school task, you will use a full-fledged database that also can automatically remove child entities when the parent is deleted, verify keys ownership and instead of arrays for storing keys, you will use additional "join" tables)  

To determine that all your restful logic works correctly => run the script "npm run test".  
But be careful because these tests are integration (E.g. to test "delete" logic => it creates the entity via a "create" endpoint).  

### Description for the 2 task:  
You are free to create your own gql environment as long as you use predefined graphql endpoint (./src/routes/graphql/index.ts).  
(or stick to the [default code-first](https://github.dev/graphql/graphql-js/blob/ffa18e9de0ae630d7e5f264f72c94d497c70016b/src/__tests__/starWarsSchema.ts))  

### Description for the 3 task:
If you have chosen a non-default gql environment, then the connection of some functionality may differ, be sure to report this in the PR.  

### Description for the 4 task:  
If you have chosen a non-default gql environment, then the connection of some functionality may differ, be sure to report this in the PR.  
Limit the complexity of the graphql queries by their depth with "graphql-depth-limit" package.  
E.g. User can refer to other users via properties `userSubscribedTo`, `subscribedToUser` and users within them can also have `userSubscribedTo`, `subscribedToUser` and so on.  
Your task is to add a new rule (created by "graphql-depth-limit") in [validation](https://graphql.org/graphql-js/validation/) to limit such nesting to (for example) 6 levels max.
