export default class Rental {
  constructor(rentalData, movies) {
    this.movieId = rentalData.movieId;
    this.days = rentalData.days;
    this.movies = movies;
  }

  get movie() {
    return this.movies[this.movieId];
  }

  get amount() {
    let thisAmount = 0;

    // determine amount for each movie
    switch (this.movie.code) {
      case 'regular':
        thisAmount = 2;
        if (this.days > 2) {
          thisAmount += (this.days - 2) * 1.5;
        }
        break;
      case 'new':
        thisAmount = this.days * 3;
        break;
      case 'childrens':
        thisAmount = 1.5;
        if (this.days > 3) {
          thisAmount += (this.days - 3) * 1.5;
        }
        break;
    }
    return thisAmount;
  }

  get frequentRenterPoints() {
    return this.movie.code === 'new' && this.days > 2 ? 2 : 1;
  }
}
