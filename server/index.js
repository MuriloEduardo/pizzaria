const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = 'mongodb://localhost:27017/pizzas';

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const users = require('./routes/api/users');
const pizzas = require('./routes/api/pizzas');

app.use('/api/users', users);
app.use('/api/pizzas', pizzas);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at ${port}`));
