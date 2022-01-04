function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last > accountB.name.last ? 1 : -1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  let sum = 0;
  return books.reduce((total, book) => {
    return total + borrowReduction(book, account.id);
  }, 0);
}

// helper for getTotalNumberOfBorrows()
function borrowReduction(book, id) {
  return book.borrows.reduce((total, borrow) => {
    return total + (borrow.id === id ? 1 : 0);
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let relevantBooks = books.filter((book) => {
    return book.borrows.some((borrow) => {
      return !borrow.returned && borrow.id === account.id;
    });
  });
  let mbooks = relevantBooks.map((book) => {
    let auth = authors.find((author) => author.id === book.authorId);
    return { ...book, author: auth };
  });
  return mbooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
