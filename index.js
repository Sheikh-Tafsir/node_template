const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http');
require("dotenv").config();

var corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add the HTTP methods you need
  allowedHeaders: ["Content-Type", "Authorization"], // Add the headers you want to allow
};

// Then use corsOptions in your CORS middleware setup
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.get("/api", (req, res) => {
  res.send("Hello, world api!");
});

app.use("/api/books", require("./src/books/controller/BooksController"))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
