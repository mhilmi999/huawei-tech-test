const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/users');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/v1', usersRouter);
app.use('/register',express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
    res.status(404);
    res.send(`<h1>Error 404: Resource not found</h1>`);
});

app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
});