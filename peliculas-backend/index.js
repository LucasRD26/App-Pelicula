const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/genero', require('./routes/genero'));
app.use('/director', require('./routes/director'));