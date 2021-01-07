//Import Packages
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const { graphqlHTTP } = require("express-graphql");

const graphqlSchema = require("./graqphql/schema");
const graphqlResolver = require("./graqphql/resolvers");

//Initialize express server
const app = express();

//Import routes

//Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

//Implement Routes
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occured.";
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

//Run server at port 3000
app.listen(process.env.PORT || 3000);
module.exports = app;
