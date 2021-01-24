import { ApolloServer, PubSub } from "apollo-server";
import mongoose from "mongoose";

import { MONGODB } from "./config.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("DB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
