const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const dotenv = require('dotnev');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connect=()=>{mongoose.connect(
    process.env.MONGO).then(() => {
    app.listen(PORT, () => {
        console.log(`server listen to port ${PORT}`);
    });
}
);
}


app.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (!user || !(await user.comparePassword(req.body.password))) {
            return res.status(401).send({ message: 'Login failed' });
        }
        res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).send(error);
    }
});

