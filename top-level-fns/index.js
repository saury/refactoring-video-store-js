function movieFor(rental, movies) {
  return movies[rental.movieID];
}

function amountFor(r, movies) {
  let thisAmount = 0;

  // determine amount for each movie
  switch (movieFor(r, movies).code) {
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

function totalAmount(customer, movies) {
  return customer.rentals.reduce((total, r) => total + amountFor(r, movies), 0);
}

function frequentRenterPointsFor(r, movies) {
  return movieFor(r, movies).code === 'new' && r.days > 2 ? 2 : 1;
}

function totalFrequentRenterPoints(customer, movies) {
  return customer.rentals
    .map(r => frequentRenterPointsFor(r, movies))
    .reduce((a, b) => a + b, 0);
}

function textStatement(customer, movies) {
  const amount = () => totalAmount(customer, movies);
  const frequentRenterPoints = () => totalFrequentRenterPoints(customer, movies);
  const movie = aRental => movieFor(aRental, movies);
  const rentalAmount = aRental => amountFor(aRental, movies);

  let result = `Rental Record for ${customer.name}\n`;
  for (const r of customer.rentals) {
    result += `\t${movie(r).title}\t${rentalAmount()}\n`;
  }
  result += `Amount owed is ${amount()}\n`;
  result += `You earned ${frequentRenterPoints()} frequent renter points\n`;
  return result;
}

function htmlStatement(customer, movies) {
  const amount = () => totalAmount(customer, movies);
  const frequentRenterPoints = () => totalFrequentRenterPoints(customer, movies);
  const movie = aRental => movieFor(aRental, movies);
  const rentalAmount = aRental => amountFor(aRental, movies);

  let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
  result += '<table>\n';
  for (const r of customer.rentals) {
    result += `  <tr><td>${movie(r).title}</td><td>${rentalAmount(
      r,
    )}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>Amount owed is <em>${amount()}</em></p>\n`;
  result += `<p>You earned <em>${frequentRenterPoints()}</em> frequent renter points</p>\n`;
  return result;
}

export default function statement(customer, movies, format = 'text') {
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
