export default function statement(customer, movies, format = 'text') {
  function movieFor(r) {
    return movies[r.movieID];
  }

  function amountFor(r) {
    let thisAmount = 0;

    // determine amount for each movie
    switch (movieFor(r).code) {
      case 'regular':
        thisAmount = 2;
        if (r.days > 2) {
          thisAmount += (r.days - 2) * 1.5;
        }
        break;
      case 'new':
        thisAmount = r.days * 3;
        break;
      case 'childrens':
        thisAmount = 1.5;
        if (r.days > 3) {
          thisAmount += (r.days - 3) * 1.5;
        }
        break;
    }
    return thisAmount;
  }

  function totalAmount() {
    return customer.rentals.reduce((total, r) => total + amountFor(r), 0);
  }

  function frequentRenterPointsFor(r) {
    return movieFor(r).code === 'new' && r.days > 2 ? 2 : 1;
  }

  function totalFrequentRenterPoints() {
    return customer.rentals
      .map(r => frequentRenterPointsFor(r))
      .reduce((a, b) => a + b, 0);
  }

  function textStatement() {
    let result = `Rental Record for ${customer.name}\n`;
    for (const r of customer.rentals) {
      result += `\t${movieFor(r).title}\t${amountFor(r)}\n`;
    }
    result += `Amount owed is ${totalAmount()}\n`;
    result += `You earned ${totalFrequentRenterPoints()} frequent renter points\n`;
    return result;
  }

  function htmlStatement() {
    let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
    result += '<table>\n';
    for (const r of customer.rentals) {
      result += `  <tr><td>${movieFor(r).title}</td><td>${amountFor(
        r,
      )}</td></tr>\n`;
    }
    result += '</table>\n';
    result += `<p>Amount owed is <em>${totalAmount()}</em></p>\n`;
    result += `<p>You earned <em>${totalFrequentRenterPoints()}</em> frequent renter points</p>\n`;
    return result;
  }

  const dispatchTable = {
    text: textStatement,
    html: htmlStatement,
  };

  if (undefined === dispatchTable[format]) {
    throw new Error(`unknown statement format ${format}`);
  }
  return dispatchTable[format].call();
}

// ! customer
// ! {
// !   "name": "martin",
// !   "rentals": [
// !     {"movieID": "F001", "days": 3},
// !     {"movieID": "F002", "days": 1},
// !   ]
// ! }
// * movies
// * {
// *   "F001": {"title": "Ran",                     "code": "regular"},
// *   "F002": {"title": "Trois Couleurs: Bleu",     "code": "regular"},
// * }
