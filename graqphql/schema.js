const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        category: String
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        image: String!
        author_id: Int
        created_at: String
        updated_at: String
    }

    type Todo {
        id: ID!
        title: String!
        status: Boolean
    }    

    type User {
        id: ID!
        name: String!
        email: String!
        username: String!
        avatar: String!
        address: AddressData
        phone: String!
        website: String!
        company: CompanyData!
    }

    type AddressData {
        street: String!
        suite:  String!
        city: String!
        zip: String!
        geo: GeoData!
    }

    type GeoData {
        lat: String!
        lng: String!
    }

    type CompanyData {
        name: String!
        catchPhrase: String!
        email: String!
        website: String!
        address: AddressData!        
    }

    type PostData{
        posts: [Post!]
    }

    type TodoData{
        todos: [Todo!]
    }

    type UserData {
        users: [User!]
    }

    type ProductData {
        products: [Product!]
    }

    input postInputData {
        title: String!
        content: String!
    }

    input todoInputData {
        title: String!
        status: Boolean
    }    

    input productInputData {
        name: String!
        description: String!
        price: Float!
        category: String
    }

    type RootQuery {
        getPosts(n: Int): PostData!
        getPost(id: Int!): Post!

        getTodo(id: Int!): Todo!
        getTodos(n: Int): TodoData!

        getUser(id: Int!): User!
        getUsers(n: Int): UserData!

        getProduct(id: Int!): Product!
        getProducts(n: Int): ProductData!
    }

    type RootMutation{
        createPost(postInput:postInputData): Post!
        deletePost(id: Int!): Boolean
        updatePost(id: Int!, postInput:postInputData): Post!

        createTodo(todoInput:todoInputData): Todo!
        deleteTodo(id: Int!): Boolean
        updateTodo(id: Int!, todoInput:todoInputData): Todo!

        createProduct(productInput:productInputData): Product!
        deleteProduct(id: Int!):Boolean
        updateProduct(id: Int!, productInput: productInputData): Product!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);