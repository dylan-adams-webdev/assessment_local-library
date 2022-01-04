function getTotalBooksCount(books) {
  return Object.entries(books).length;
}

function getTotalAccountsCount(accounts) {
  return Object.entries(accounts).length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    return total + book.borrows.reduce((total, borrow) => {
      return total + !borrow.returned ? 1 : 0;
    },0);
  },0); 
}

function getMostCommonGenres(books) {
  const genres = [];
  books.map(book => {
    const found = genres.find(item => item.name === book.genre);
    if(found) found.count++;
    else genres.push({name: book.genre, count: 1});
  });
  genres.sort((itemA, itemB) => itemA.count < itemB.count ? 1 : -1);
  return genres.slice(0,5);
}

function getMostPopularBooks(books) {
  const booksByPopularity = [];
  books.map(book => {
    const count = book.borrows.length;
    booksByPopularity.push({name: book.title, count: count});
  });
  booksByPopularity.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);
  return booksByPopularity.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const authorsByPopularity = [];
  authors.map(author => {
    const name = `${author.name.first} ${author.name.last}`;
    const found = authorsByPopularity.find(entry => entry.name === name);
    const count = books.reduce((total, book) => {
      return total + (book.authorId === author.id ? book.borrows.length : 0);
    },0);
    if(found) found.count += count;
    else authorsByPopularity.push({name: name, count: count});
  });
  authorsByPopularity.sort((authorA, authorB) => {
    return authorA.count < authorB.count ? 1 : -1;
  });
  return authorsByPopularity.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
