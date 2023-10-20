const pool = require("../config/connection");

class Movie {
    constructor(id, title, genres, year, photo) {
        this.id = +id;
        this.title = title;
        this.genres = genres;
        this.year = year;
        this.photo = photo;
    }

    static showAll(callback) {
        const query = `SELECT * FROM movies`;

        pool.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            const movies = result.rows.map(movie => new Movie(movie.id, movie.title, movie.genres, movie.year, movie.photo));

            console.log("Movies Retrieved");

            callback(null, movies);
        });
    }

    static showPage(page, pageSize, callback) {
        const offset = (page - 1) * pageSize;
        const query = `
            SELECT * FROM movies
            LIMIT $1
            OFFSET $2;
        `;

        const values = [pageSize, offset];

        pool.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            const movies = result.rows.map(movie => new Movie(movie.id, movie.title, movie.genres, movie.year, movie.photo));

            console.log("Movies Retrieved");

            callback(null, movies);
        });
    }

    static addMovie(objMovie, callback) {
        const query = `
            INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3);
        `;

        const arrData = [objMovie.title, objMovie.genres, objMovie.year];

        pool.query(query, arrData, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            console.log(`${objMovie.title} has been added to the database.`);
            callback(null, result);
        });
    }

    static showMovieId(id, callback) {
        const query = `SELECT * FROM movies WHERE id = $1;`;
        const values = [id];

        pool.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            if (result.rows.length === 0) {
                return callback(null, null);
            }

            const movieData = result.rows[0];
            const movie = new Movie(movieData.id, movieData.title, movieData.genres, movieData.year, movieData.photo);

            console.log("Retrieved Movie:", movie);
            callback(null, movie);
        });
    }

    static editMovie(id, objMovie, callback) {
        const query = `
            UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4;
        `;
        const arrData = [objMovie.title, objMovie.genres, objMovie.year, id];

        pool.query(query, arrData, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            console.log(`${objMovie.title} has been updated in the database.`);
            callback(null, result);
        });
    }

    static deleteMovie(id, callback) {
        const query = `
            DELETE FROM movies WHERE id = $1;
        `;
        const values = [id];

        pool.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            console.log(`${id} has been deleted from the database.`);
            callback(null, result);
        });
    }

    static updateMoviePhoto(id, photoPath, callback) {
        const query = `
            UPDATE movies SET photo = $1 WHERE id = $2;
        `;
        const values = [photoPath, id];

        pool.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            console.log(`Updated photo for movie with ID ${id}`);
            callback(null, result);
        });
    }
}

module.exports = Movie;
