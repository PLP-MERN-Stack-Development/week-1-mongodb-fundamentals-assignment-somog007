// queries.js - MongoDB queries for PLP Bookstore

// 1. Find all books in the "Fiction" genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after the year 2000
db.books.find({ published_year: { $gt: 2000 } });

// 3. Find all books by "George Orwell"
db.books.find({ author: "George Orwell" });

// 4. Update the price of "The Great Gatsby" to $12.99
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 12.99 } }
);

// 5. Delete the book with title "Animal Farm"
db.books.deleteOne({ title: "Animal Farm" });

// 6. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Use projection to return only title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 8. Sort books by price in ascending order
db.books.find().sort({ price: 1 });

// 9. Sort books by price in descending order
db.books.find().sort({ price: -1 });

// 10. Pagination: Page 1 (first 5 books)
db.books.find().limit(5);

// 11. Pagination: Page 2 (next 5 books)
db.books.find().skip(5).limit(5);

// 12. Aggregation: Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 13. Aggregation: Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

// 14. Aggregation: Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1,
      _id: 0
    }
  },
  { $sort: { decade: 1 } }
]);

// 15. Create index on the title field
db.books.createIndex({ title: 1 });

// 16. Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 17. Use explain() to analyze query performance with index
db.books.find({ title: "The Hobbit" }).explain("executionStats");
