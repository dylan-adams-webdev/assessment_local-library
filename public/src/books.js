function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = [];
  const returned = [];
  books.map((book) => {
    bookIsReturned(book) ? returned.push(book) : borrowed.push(book);
  });
  return [[...borrowed], [...returned]];
}

// helper for partitionBooksByBorrowedStatus()
function bookIsReturned(book) {
  return book.borrows.every((borrow) => borrow.returned);
}

function getBorrowersForBook(book, accounts) {
  const accountsForBook = [];
  book.borrows.map((borrow) => {
    let account = accounts.find((account) => account.id === borrow.id);
    account = { ...account, returned: borrow.returned };
    if (accountsForBook.length < 10) accountsForBook.push(account);
  });
  return accountsForBook;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
