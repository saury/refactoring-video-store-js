import Rental from './rental';

export default class Customer {
  constructor(data, movies) {
    this.data = data;
    this.movies = movies;
  }

  get name() {
    return this.data.name;
  }

  get rentals() {
    return this.data.rentals.map(rental => new Rental(rental, this.movies));
  }

  get totalAmount() {
    return this.rentals.reduce((total, rental) => total + rental.amount, 0);
  }

  get totalFrequentRenterPoints() {
    return this.customer.rentals
      .map(rental => rental.frequentRenterPoints)
      .reduce((a, b) => a + b, 0);
  }
}
