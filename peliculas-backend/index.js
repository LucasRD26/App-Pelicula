const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/genero', require('./routes/Genero'));
app.use('/director', require('./routes/Director'));
app.use('/productora', require('./routes/Productora'));
app.use('/tipo', require('./routes/Tipo'));
app.use('/media', require('./routes/Media'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});