// movieRepository.js
const Movie = require("../models/movieModel");

exports.getAllMovies = (callback) => {
    Movie.showAll(callback);
};

exports.getMoviesByPage = (page, pageSize, callback) => {
    Movie.showPage(page, pageSize, callback);
};

exports.getMovieId = (id, callback) => {
    Movie.showMovieId(id, callback);
};

exports.addMovie = (objMovie, callback) => {
    const movie = new Movie(null, objMovie.title, objMovie.genres, objMovie.year, null);
    Movie.addMovie(movie, callback);
};

exports.updateMovie = (id, objMovie, callback) => {
    const movie = new Movie(id, objMovie.title, objMovie.genres, objMovie.year, null);
    Movie.editMovie(id, movie, callback);
};

exports.deleteMovie = (id, callback) => {
    Movie.deleteMovie(id, callback);
};

exports.updateMoviePhoto = (id, photoPath, callback) => {
    Movie.updateMoviePhoto(id, photoPath, callback);
};
