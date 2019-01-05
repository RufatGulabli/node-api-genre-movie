const express = require('express');
const genres = require('./controllers/genres');
const customers = require('./controllers/customers');
const movies = require('./controllers/movies');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));