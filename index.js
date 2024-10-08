import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    greeting() {
      return "Hello World!"
    },
    games() {
      return db.games
    },
    game(parent, args) {
      return db.games.find((game) => game.id == args.id)
    },
    authors() {
      return db.authors
    },
    author(parent, args) {
      return db.authors.find((author) => author.id == args.id)
    },
    reviews() {
      return db.reviews
    },
    review(parent, args) {
      return db.reviews.find((review) => review.id == args.id)
    }
  },
  Review: {
    author(parent, args) {
      return db.authors.find((author) => author.id == parent.author_id)
    },
    game(parent, args) {
      return db.games.find((game) => game.id == parent.game_id)
    }
  },
  Game: {
    reviews(parent, args) {
      return db.reviews.filter((review) => review.game_id == parent.id)
    }
  },
  Author: {
    reviews(parent, args) {
      let _reviews = db.reviews.filter((review) => review.author_id == parent.id)
      if (args.minRating != null) {
        return _reviews.filter((review) => review.rating >= args.minRating)
      } else {
        return _reviews
      }
    }
  },
  Mutation: {
    createGame(parent, args) {
      let _id = Math.floor(Math.random() * 10000)
      let game = {
        id: _id,
        title: args.data.title,
        platform: args.data.platform
      }
      db.games.push(game)
      return _id
    },
    deleteGame(parent, args) {
      db.games = db.games.filter((game) => game.id != args.id)
      return true
    },
    updateGame(parent, args) {
      db.games = db.games.map((game) => {
        if (game.id == args.id) {
          return {
            id: args.id,
            title: args.title,
            platform: args.platform
          }
        }
        return game
      })
      return true
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`Server ready at: ${url}`);