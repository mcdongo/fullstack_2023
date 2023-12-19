const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('CONNECTED TO MONGODB')
  })
  .catch((error) => {
    console.log('ERROR CONNECTING TO MONGODB', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) { //e
        const author = await Author.find({ name: args.author })
        if (!author) {
          return null
        }
        return await Book.find({ author }).populate('author')
      }

      if (args.genre) {
        return await Book.find({
          genres: {
            $elemMatch: {
              $eq: args.genre
            }
          }
        }).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return await Author.find({})
    }
  },

  Author: {
    bookCount: async (author) => { //e
      return await Book.find({ author }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log(args)
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      console.log(author)
      const newBook = new Book({ ...args, author })
      
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return newBook
    },
    editAuthor: async (root, args) => { //e
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})