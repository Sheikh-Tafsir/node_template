const pool = require("../../db");
const { BooksModel } = require("../domain/BooksModel");

const addBooks = async (req, res) => {
    try {
        //console.log(req.body);
        const { id, title, author, genre, price } = req.body;

        const query = `
            INSERT INTO books (id, title, author, genre, price)
            VALUES ($1, $2, $3, $4, $5);
        `;
        const values = [id, title, author, genre, price];
    
        const result = await pool.query(query, values);

        res.status(201).json(req.body);
    }
    catch (error) {
        console.error("Error during add:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateBooks = async (req, res) => {
    try {
        const id = req.params.id;
        const {title, author, genre, price } = req.body;

        const query = `
            UPDATE books 
            SET title = $1, author = $2, genre = $3, price = $4 
            WHERE id = $5
            RETURNING *;
        `;
        const values = [title, author, genre, price, id];
    
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            res.status(404).json({ "message": `book with id: ${id} was not found` });
        } else {
            const booksModel = new BooksModel(result.rows[0]);
            res.status(200).json(booksModel);
        }
    }
    catch (error) {
        console.error("Error during add:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const fetchBooks = async (req, res) => {
    try {
        const id = req.params.id;

        const query = `
            SELECT * FROM books WHERE id = $1;
        `;
        const values = [id];
    
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            res.status(404).json({ "message": `book with id: ${id} was not found` });
        } else {
            const booksModel = new BooksModel(result.rows[0]);
            res.status(200).json(booksModel);
        }
    }
    catch (error) {
        console.error("Error during fetch:", error); // Corrected error message
        res.status(500).json({ error: "Internal server error" });
    }
}

const fetchAllBooks = async (req, res) => {
    try {
        const query = `
            SELECT * FROM books;
        `;
    
        const result = await pool.query(query);

        if (result.rowCount === 0) {
            res.status(200).json({ "books": [] });
        } else {
            const booksModels = result.rows.map(row => new BooksModel(row));
            res.status(200).json({ "books": booksModels });
        }
    }
    catch (error) {
        console.error("Error during fetch:", error); // Corrected error message
        res.status(500).json({ error: "Internal server error" });
    }
}

const searchBooks = async (req, res, next) => {
    try {
        let { title, author, genre, sort, order } = req.query;
        console.log(req.query);

        // Construct the SQL query
        let query = `
            SELECT * FROM books
        `;

        let values = [];

        // Add WHERE clause based on the search field provided
        if (title) {
            query += ` WHERE title = $1`;
            values.push(title);
        } else if (author) {
            query += ` WHERE author = $1`;
            values.push(author);
        } else if (genre) {
            query += ` WHERE genre = $1`;
            values.push(genre);
        }

        // Add sorting
        if (sort) {
            query += ` ORDER BY ${sort}`;
            // If sorting order is provided, use it; otherwise, default to ascending order
            if (order && ['ASC', 'DESC'].includes(order.toUpperCase())) {
                query += ` ${order.toUpperCase()}`;
            } else {
                query += ` ASC`;
            }
        }

        // Execute the query
        const result = await pool.query(query, values);

        // Handle the response
        if (result.rowCount === 0) {
            res.status(200).json({ "books": [] });
        } else {
            const books = result.rows;
            res.status(200).json({ "books": books });
        }
    }
    catch (error) {
        console.error("Error during search:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    addBooks,
    updateBooks,
    fetchBooks,
    fetchAllBooks,
    searchBooks,
};