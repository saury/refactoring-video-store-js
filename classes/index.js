import Customer from './customer';

export default function statement(customerData, movies) {
  const customer = new Customer(customerData, movies);

  let result = `Rental Record for ${customer.name}\n`;

  for (const r of customer.rentals) {
    result += `\t${r.movie.title}\t${r.amount}\n`;
  }

  result += `Amount owed is ${customer.totalAmount}\n`;
  result += `You earned ${
    customer.totalFrequentRenterPoints
  } frequent renter points\n`;
  return result;
}

export function htmlStatement(customerData, movies) {
  const customer = new Customer(customerData, movies);
  let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
  result += '<table>\n';
  for (const r of customer.rentals) {
    result += `  <tr><td>${r.movie.title}</td><td>${r.amount}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>Amount owed is <em>${customer.amount}</em></p>\n`;
  result += `<p>You earned <em>${
    customer.frequentRenterPoints
  }</em> frequent renter points</p>\n`;
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
