const express = require("express");
const app = express();
require("dotenv").config()
const bodyParser = require("body-parser");
const movieRoute = require("./routes/movieRoute");
const usersRoute = require("./routes/usersRoute")

app.use(bodyParser.json());
app.use("/api", movieRoute);
app.use("/api", usersRoute); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
