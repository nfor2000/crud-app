const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDb = require('./config/dbconnect');
const errorHandler = require('./middleware/errorMiddleWare');

const PORT = process.env.PORT || 4500;

connectDb();

const app = express();

app.use(errorHandler)

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
     extended: false
}));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', require('./routes/userRoutes'));

app.get('^/index(.html)?', (req, res) => {
     res.status(201).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/create_user(.html)?', (req, res) => {
     res.status(201).sendFile(path.join(__dirname, 'public', 'create_user.html'));
});

app.get('/update_user(.html)?', (req, res) => {
     res.status(201).sendFile(path.join(__dirname, 'public', 'update_user.html'));
});

app.listen(PORT, ()=>console.log('server running on port '+ PORT));