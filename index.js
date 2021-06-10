const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// Connect to DataBase
const config = require('./config/db-keys');
const authRoutes = require('./routes/auth');

// Initiate app
const app = express();

const port = 3000;

// for using others' sites API, social net authorization, for examle
app.use(cors());

// to use post method of forms submitting
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

// run server
// check if server is running - http://localhost:3000/
app.listen(port, () => {
    console.log(`Server was running on port ${port}!`);
});

// Connecting to database
mongoose.connect(config.mongoDbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.log('Error in connection with MongoDB', err))


app.use(require('morgan')('dev'))

app.use(passport.initialize())
require('./middleware/passport')(passport)


// URL-addresses
// app.get('/') - main page
app.get('/', (req, res) => {
    // message in browser on main page
    res.send('Main blog page!!!')

    //get all the posts from the database
    // Post.find().then( posts => res.json(posts))
});

app.use('/api/auth', authRoutes)
