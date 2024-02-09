const express = require("express");
const router = express.Router();
const booksService = require("../service/BooksService");

//Add books
router.post("/", booksService.addBooks);

//update books
router.put(`/:id`, booksService.updateBooks);

// Fetch Books
router.get("/:id", booksService.fetchBooks);

//Fetch all books
// router.get("/", booksService.fetchAllBooks);

//Search books
router.get("/", booksService.searchBooks);


module.exports = router;
