/**
 * Local Library Assessment
 * Dylan Adams | Thinkful
 * Version: 1.00
 * Last updated 1/4/22
 */

/**
 * Get total number of books
 * Params:  (Object array) A list of book objects
 * Returns: (int) the number of book objects in the list
 */
function getTotalBooksCount(books) {
  return books.length;
}

/**
 * Get total number of user accounts
 * Params:  (Object array) The list of account objects
 * Returns: (int) the number of account objects in the array
 */
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/**
 * Get total number of books currently checked out
 * Params: (Object array) The list of book objects
 * Returns: (Object array) A list of checked out books
 */
function getBooksBorrowedCount(books) {
  // accumulate the total borrowed count for all books
  return books.reduce((total, book) => {
    return (
      total +
      book.borrows.reduce((prev, borrow) => {
        return prev + !borrow.returned ? 1 : 0;
      }, 0)
    );
  }, 0);
}

/**
 * Get a list of the top five genres of books
 * Params:  (Object array) The list of book objects
 * Returns: (Object array) A list of objects containing the
 *    name and total borrow count of the top five genres of books
 */
function getMostCommonGenres(books) {
  const genres = [];
  // determine whether each book's genre has been accounted for
  // then either increment the count for that genre or add the
  // genre to the genre list and initialize the count to 1
  books.map((book) => {
    const found = genres.find((genre) => genre.name === book.genre);
    if (found) found.count++;
    else genres.push({ name: book.genre, count: 1 });
  });
  // sort the genre list from highest to lowest count and return
  // a new array containing only the first five elements of the sorted array
  genres.sort((itemA, itemB) => (itemA.count < itemB.count ? 1 : -1));
  return genres.slice(0, 5);
}

/**
 * Get a list of the top five most popular books
 * Params:  (Object array) The list of book objects
 * Returns: (Object array) A list of objects containing the
 *    name (title) and total borrow count of the top five most
 *    borrowed books
 */
function getMostPopularBooks(books) {
  const booksByPopularity = [];
  // count the number of borrows for each book and add both
  // name and count as an object to an array
  books.map((book) => {
    const count = book.borrows.length;
    booksByPopularity.push({ name: book.title, count: count });
  });
  // sort the book popularity array from highest to lowest
  // number of borrows then return a new array containing
  // only the first five elements of the sorted array
  booksByPopularity.sort((bookA, bookB) => {
    return bookA.count < bookB.count ? 1 : -1;
  });
  return booksByPopularity.slice(0, 5);
}

/**
 * Get a list of the top five most popular authors
 * Params:  (Object array) The list book objects
 *          (Object array) The list of authors
 * Returns: (Object array) A list of the top five most
 *    borrowed authors
 */
function getMostPopularAuthors(books, authors) {
  const authorsByPopularity = [];
  // determine whether the author of each book has been
  // accounted for in the authors array and count the number
  // of borrows for books written by that author
  authors.map((author) => {
    const name = `${author.name.first} ${author.name.last}`;
    const found = authorsByPopularity.find((entry) => entry.name === name);
    const count = books.reduce((total, book) => {
      return total + (book.authorId === author.id ? book.borrows.length : 0);
    }, 0);
    // either increment the count for that author or add an object
    // containing the first and last name of the author and the total
    // count of books determined earlier
    if (found) found.count += count;
    else authorsByPopularity.push({ name: name, count: count });
  });
  // sort the authors array by highest to lowest number of borrows
  // then return a new array containing only the first five elements
  // of the sorted array
  authorsByPopularity.sort((authorA, authorB) => {
    return authorA.count < authorB.count ? 1 : -1;
  });
  return authorsByPopularity.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
