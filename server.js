const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const adb = knex({
    client: 'pg',
    connection: {
        connectionString: 'process.env.DATABASE_URL',
        ssl: true
    }
});

adb.select("*").from("public.users");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('it is working')
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, adb, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, adb, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, adb)});

app.put('/image', (req, res) => {image.handleImage(req, res, adb)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`app is running on port ${PORT}`)
});
