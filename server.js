const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const knex = require('knex');
const e = require('express');

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const saltRounds = 10;

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'prashant',
        database: 'smartbrain'
    }
});

// db.select('*').from('users')
//     .then(data => {
//         console.log(data)
//     })

const app = express()

app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
//     res.json(database.users)
// })

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, saltRounds))
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db))
app.put('/image', (req, res) => image.handleImage(req, res, db))

app.listen(5000, () => {
    console.log('app is running on port 5000.')
})