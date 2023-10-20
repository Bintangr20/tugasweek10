// movieController.js
const movieRepository = require("../repositories/movieRepository");

exports.getAllMovies = (req, res) => {
    movieRepository.getAllMovies((err, movies) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching movies" });
        }
        res.json(movies);
    });
};

exports.getMoviesByPage = (req, res) => {
    const page = parseInt(req.params.page);
    const pageSize = parseInt(req.params.pageSize);
    
    movieRepository.getMoviesByPage(page, pageSize, (err, movies) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching movies" });
        }
        res.json(movies);
    });
};


exports.getMovieId = (req, res) => {
    const movieId = req.params.id;

    movieRepository.getMovieId(movieId, (err, movie) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching movie" });
        }
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.json(movie);
    });
};

exports.addMovie = (req, res) => {
    const objMovie = req.body;
    movieRepository.addMovie(objMovie, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error adding movie" });
        }
        res.json({ message: "Movie added successfully" });
    });
};

exports.updateMovie = (req, res) => {
    const id = req.params.id;
    const objMovie = req.body;
    movieRepository.updateMovie(id, objMovie, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error updating movie" });
        }
        res.json({ message: "Movie updated successfully" });
    });
};

exports.deleteMovie = (req, res) => {
    const id = req.params.id;
    movieRepository.deleteMovie(id, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting movie" });
        }
        res.json({ message: "Movie deleted successfully" });
    });
};

exports.updateMoviePhoto = (req, res) => {
    const id = req.params.id;
    const photoPath = req.file.path;
    movieRepository.updateMoviePhoto(id, photoPath, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error updating movie photo" });
        }
        res.json({ message: "Movie photo updated successfully" });
    });
};

