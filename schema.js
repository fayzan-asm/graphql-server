export const typeDefs = `#graphql
  type Query {
    greeting: String
    games: [Game]
    game(id: ID): Game
    authors: [Author]
    author(id: ID): Author
    reviews: [Review]
    review(id: ID): Review
  }
  type Mutation {
    createGame(data: AddGame): ID
    deleteGame(id: ID): Boolean
    updateGame(id: ID, title: String, platform: [String]): Boolean
  }
  type Game {
    id: ID!
    title: String
    platform: [String]
    reviews: [Review]
  }
  type Author {
    id: ID!
    name: String
    verified: Boolean
    reviews(minRating: Int): [Review]
  }
  type Review {
    id: ID!
    rating: Int
    content: String
    author: Author
    game: Game
  }
  input AddGame {
    title: String,
    platform: [String]
  }
`