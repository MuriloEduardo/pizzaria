const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../models/User');

users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res) => {

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created: new Date()
    };

    User
        .findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    userData.password = hash;

                    User.create(userData)
                        .then(user => {
                            res.json(user);
                        })
                        .catch(err => res.send(err));
                });
            } else {
                res.send({ error: 'User already exists' });
            }
        })
        .catch(err => res.send(err));
});

users.post('/login', (req, res) => {
    User
        .findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    };

                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });

                    res.send(token);
                } else {
                    res.json({ error: 'Password invalid' });
                }
            } else {
                res.json({ error: 'User does not exist' });
            }
        })
        .catch(err => res.send(err));
});

module.exports = users;
