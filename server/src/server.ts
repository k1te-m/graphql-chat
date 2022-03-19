import express from "express";
import config from "./config/config";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import http from "http";
import typeDefs from "./graphql/combinedTypes";
import resolvers from "./graphql/combinedResolvers";
import mongoose from "mongoose";

const start = async () => {
  mongoose.connect(config.mongoDbUri, {}).catch((err: any) => {
    console.log(err);
  });
  // express instance
  const app = express();

  // parse json request body
  app.use(express.json());

  // parse url encoded request body
  app.use(express.urlencoded({ extended: true }));

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const auth = req.headers.authorization || "";
      return {
        auth,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve, reject) => {
    httpServer.listen({ port: config.port }, () => {
      console.log(
        `Apollo Server on http://localhost:${config.port}/graphql 🚀🚀🚀`
      );
      resolve();
    });
  });
};

start();
