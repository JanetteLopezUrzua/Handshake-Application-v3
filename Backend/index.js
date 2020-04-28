const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/db");
const { frontendURL } = require("./config/default");

const app = express();

// multer
app.use(express.static("public"));

// Connect to Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

// use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

// use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_lab3",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Photos and Resumes
const storage = multer.diskStorage({
  destination: "./public/resumesandimages",
  filename(req, file, callback) {
    callback(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}-${file.fieldname}.${
        file.mimetype.split("/")[1]
      }`
    );
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Req Body : ", req.body);
  console.log("file", req.file.filename);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(req.file.filename);
});

// start server on port 3001
app.listen(3001, () => {
  console.log("GraphQL server started on port 3001");
});
