/**
 * Local Library Assessment
 * Dylan Adams | Thinkful
 * Version: 1.00
 * Last updated 1/4/22
 */

/**
 * Get an author by ID
 * Params:  (Object array) The list of authors
 *          (int) The id number to search for
 * Returns: (Object) The author with a matching ID
 */
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

/**
 * Get a book by ID
 * Params:  (Object array) The list of books
 *          (int) The id number to search for
 * Returns: (Object) The book with a matching ID
 */
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

/**
 * Sort all books by borrowed status
 * Params:  (Object array) The list of books
 * Returns: (Object array) The sorted list of books
 *          [[ borrowed ],[ returned ]]
 */
function partitionBooksByBorrowedStatus(books) {
  const borrowed = [];
  const returned = [];
  // determine the borrow status for each book and push
  // to the appropriate array
  books.map((book) => {
    _bookIsReturned(book) ? returned.push(book) : borrowed.push(book);
  });
  // combine and return the borrowed and returned arrays
  return [[...borrowed], [...returned]];
}

// determine if book is borrowed or has been returned
// params:  (Object) the book to query status
// returns: (boolean) true if returned, else false
function _bookIsReturned(book) {
  return book.borrows.every((borrow) => borrow.returned);
}

/**
 * Get a list of all accounts that have borrowed a given book
 * and whether or not that account has returned the book
 * Params:  (Object) The book to query borrowing accounts
 *          (Object array) The list of accounts
 * Returns: (Object array) A list of account objects plus
 *          the return status for the book limited to the first
 *          ten entries on file
 */
function getBorrowersForBook(book, accounts) {
  const accountsForBook = [];
  // find the accounts for each borrow of the book and add a new
  // object to the book accounts array that includes the return
  // status for the borrow up to ten entries
  book.borrows.map((borrow) => {
    const account = accounts.find((account) => account.id === borrow.id);
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
