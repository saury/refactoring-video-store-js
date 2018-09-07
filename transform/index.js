function dataMiddleWare(customer, movies) {
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

  function totalAmountFor(rentals) {
    return rentals.reduce((total, r) => total + r.amount, 0);
  }

  function frequentRenterPointsFor(r) {
    return movieFor(r).code === 'new' && r.days > 2 ? 2 : 1;
  }

  function totalFrequentRenterPointsFor(rentals) {
    return rentals
      .map(r => frequentRenterPointsFor(r))
      .reduce((a, b) => a + b, 0);
  }

  const rentals = customer.rentals.map((rental) => {
    const { title } = movieFor(rental);
    const amount = amountFor(rental);
    return { ...rental, title, amount };
  });
  const totalAmount = totalAmountFor(rentals);
  const totalFrequentRenterPoints = totalFrequentRenterPointsFor(rentals);
  const result = {
    ...customer,
    rentals,
    totalAmount,
    totalFrequentRenterPoints,
  };

  return result;
}

export default function statement(customer, movies) {
  const data = dataMiddleWare(customer, movies);

  let result = `Rental Record for ${data.name}\n`;
  for (const r of data.rentals) {
    result += `\t${r.title}\t${r.amount}\n`;
  }
  result += `Amount owed is ${data.totalAmount}\n`;
  result += `You earned ${
    data.totalFrequentRenterPoints
  } frequent renter points\n`;

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
