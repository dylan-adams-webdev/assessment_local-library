/**
 * Local Library Assessment
 * Dylan Adams | Thinkful
 * Version: 1.00
 * Last updated 1/4/22
 */

/**
 * Find the account associated with the given ID
 * Params:  (Object array) A list of accounts
 *          (int) An ID number
 * Returns: (Object) The account with the given ID
 */
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

/**
 * Get a list of user accounts sorted ascending by last name
 * Params:  (Object array) A list of accounts
 * Returns: (Object) A sorted list of user accounts
 */
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last > accountB.name.last ? 1 : -1;
  });
}

/**
 * Get the total number of borrows associated with a 
 * given user account
 * Params:  (Object array) A list of accounts
 *          (Object array) A list of books
 * Returns: (int) The total number of borrows for the account
 */
function getTotalNumberOfBorrows(account, books) {
  // accumulate the total borrows for all books made
  // by the provided user account
  return books.reduce((total, book) => {
    return total + _borrowReduction(book, account.id);
  }, 0);
}

// determine how many borrows of a book were made by the 
// provided account
// params:  (Object array) The borrowed book
//          (int) The account id to search for
// returns: (int) The total borrows of that book 
//          by that user account
function _borrowReduction(book, id) {
  let total = 0;
  // use a for...in loop on an array to satisfy requirements
  // compare the provided id with the id of the record for each
  // borrow of the book and accumulate the total
  for(let borrow in book.borrows) {
    if (book.borrows[borrow].id === id) total++;
  }
  return total;
}

/**
 * Get a list of books borrowed by a given account with embedded
 * author information
 * Params:  (Object) The account to search for books
 *          (Object array) A list of books
 *          (Object array) A list of user accounts
 * Returns: (Object array) A list of books with embedded author info
 */
function getBooksPossessedByAccount(account, books, authors) {
  // collect all books that are currently not returned
  // that belong to the provided user account
  const relevantBooks = books.filter((book) => {
    return book.borrows.some((borrow) => {
      return !borrow.returned && borrow.id === account.id;
    });
  });
  // format and add author information to all relevant books
  // collected earlier and return entire array
  const bookMap = relevantBooks.map((book) => {
    const {borrows, ...rest} = book;
    let auth = authors.find((author) => author.id === book.authorId);
    return { ...rest, author: auth, borrows };
  });
  return bookMap;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
