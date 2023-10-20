const express = require("express");
const router = express.Router();
const multer = require("multer");
const movieController = require("../controller/movieController");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.get("/movies", movieController.getAllMovies);
router.get("/movies/:page/:pageSize", movieController.getMoviesByPage);
router.get("/movies/:id", movieController.getMovieId)
router.post("/movies", movieController.addMovie);
router.put("/movies/:id", movieController.updateMovie);
router.delete("/movies/:id", movieController.deleteMovie);
router.post("/movies/:id/upload", upload.single("photo"), movieController.updateMoviePhoto);
router.use('/uploads', express.static(path.join(__dirname, '../uploads')))

module.exports = router;
