//Import Packages
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const graphqlSchema = require("./graqphql/schema");
const graphqlResolver = require("./graqphql/resolvers");

//Initialize express server
const app = express();

//Import routes

//Middleware
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('static'));
app.use('/', express.static('index.html'));
//Implement Routes
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // graphiql: true,
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
