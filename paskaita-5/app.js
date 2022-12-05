const cors = require('cors');
const express = require('express');
const app = express();

require('dotenv').config({ path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev' });

app.use(cors());

const PORT = process.env.PORT;

console.log(PORT);

app.get('/name', (req, res) => {
    res.send('My name is Petras');
});
// app.post

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));