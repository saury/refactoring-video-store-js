export default function statement(customer, movies) {
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

  let result = `Rental Record for ${customer.name}\n`;
  for (const r of customer.rentals) {
    result += `\t${movieFor(r).title}\t${amountFor(r)}\n`;
  }
  result += `Amount owed is ${totalAmount()}\n`;
  result += `You earned ${totalFrequentRenterPoints()} frequent renter points\n`;
  return result;
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
