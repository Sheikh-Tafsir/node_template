function BooksModel(data) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.genre = data.genre;
    this.price = data.price;
}

module.exports = { BooksModel };
