const express = require('express');
const massive = require('massive');
// const bodyParser = require('bodyParser');
const users = require('./controllers/user.js')

massive({
    host: 'localhost',
    port: 5432,
    database: 'addressbook',
    user: 'postgres',
    password: 'addbook'
}).then(db => {

    const app = express();
    // app.use(bodyParser.urlencoded({ extended: false }))
    app.set('db', db)

    app.use(express.json());


    app.post('/signup', users.register)

    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });

});