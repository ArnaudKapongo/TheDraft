const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

const app = express();

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

// Connection à la base de donnée
mongoose.connect(db, { useNewUrlParser: true}, (err, res) => {
            if(err){
                throw err;
            } else {
                console.log('MongoDB Connected');
        }
});



app.use(passport.initialize());

require('./config/passport')(passport);

// Nos différentes routes
app.use('/api/users', users);
app.use('/api/profile', profile);

if(process.env.NODE_ENV === 'production'){

  app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));