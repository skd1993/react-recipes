const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });
const Recipe = require("./models/Recipe");
const User = require("./models/User");

//GraphQL express middleware
// const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
// const { makeExecutableSchema } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      "editor.theme": "dark"
    }
  },
  context: {
    Recipe,
    User
  }
});

// app.use(cors(corsOptions));

// apply any middleware before "server.applyMiddleware"
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if(token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      console.log(currentUser);
    }
    catch(err) {
      console.log("an error has occurred", err);
    }
  }
  next(); // calls next func in middleware chain 
})

server.applyMiddleware({ app, cors: corsOptions }); 

// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
// app.use(
//   "/graphql",
//   bodyParser.json(),
//   graphqlExpress({
//     schema,
//     context: {
//       Recipe,
//       User
//     }
//   })
// );

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
