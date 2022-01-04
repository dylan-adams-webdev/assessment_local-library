function getTotalBooksCount(books) {
  return Object.entries(books).length;
}

function getTotalAccountsCount(accounts) {
  return Object.entries(accounts).length;
}

function getBooksBorrowedCount(books) {
  
}

function getMostCommonGenres(books) {}

function getMostPopularBooks(books) {}

function getMostPopularAuthors(books, authors) {}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
