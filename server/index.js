const express = require('express');
const massive = require('massive');
// const bodyParser = require('bodyParser');
const users = require('./controllers/user.js')
const contact = require('./controllers/addcontacts.js')
const show = require('./controllers/showContacts.js')

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
    app.post('/create-contact', contact.createContacts)
    app.get('/contacts/:id/1', show.showContacts)

    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });

});