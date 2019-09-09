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
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'smart_brain'
    }
});

adb.select("*").from("public.users");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(database.users)
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, adb, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, adb, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, adb)});

app.put('/image', (req, res) => {image.handleImage(req, res, adb)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

const DATABASE_URL = process.env.DATABASE_URL;
app.listen(3000, () => {
    console.log(`app is running on port ${DATABASE_URL}`)
});
