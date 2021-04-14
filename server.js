const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')

const saltRounds = 10;

const app = express()

app.use(express.json())
app.use(cors())

const database = {
    users: [{
        id: 123,
        name: 'Prashant',
        email: 'prashant@gmail.com',
        password: 'prashant',
        entries: 0,
        joined: new Date()
    },
    {
        id: 124,
        name: 'Sara',
        email: 'sara@gmail.com',
        password: 'sara',
        entries: 0,
        joined: new Date()
    }],
    login: [
        {
            id: '987',
            email: 'prashant@gmail.com',
            hash: ''
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signin', (req, res) => {
    // bcrypt.compare('dhyaan', '$2b$10$M4nJQbEqN3vJ47eDDKUf..xNKft0Hxt/7fFj.9MDLoMCc3IPtRNSe', function (err, result) {
    //     // result == true
    //     console.log('1st', result)
    // });
    // bcrypt.compare('prashant', '$2b$10$M4nJQbEqN3vJ47eDDKUf..xNKft0Hxt/7fFj.9MDLoMCc3IPtRNSe', function (err, result) {
    //     // result == false
    //     console.log('2nd', result)
    // });

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json(database.users[0])
    } else {
        res.status(400).json('error logging in!!!')
    }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    // bcrypt.hash(password, saltRounds, function (err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash)
    // });
    database.users.push({
        id: 125,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            res.json(user)
        }
    })
    if (!found) {
        res.status(400).json('user not found')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(400).json('user not found!')
    }
})

app.listen(5000, () => {
    console.log('app is running on port 5000.')
})