const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const pizzas = require('./routes/api/pizzas');

app.use('/api/pizzas', pizzas);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at ${port}`));
