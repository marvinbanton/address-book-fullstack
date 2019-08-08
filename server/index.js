const express = require('express');
const massive = require('massive');
const users = require('./controllers/user.js')
const user = require('./controllers/signin.js')
const contact = require('./controllers/addcontacts.js')
const show = require('./controllers/showContacts.js')
const remove = require('./controllers/deleteContact.js')
const request = require('./controllers/requestContact.js')
const update = require('./controllers/updateContact.js')
massive({
    host: 'localhost',
    port: 5432,
    database: 'addressbook',
    user: 'postgres',
    password: 'addbook'
}).then(db => {

    const app = express();
    app.set('db', db)

    app.use(express.json());
    app.post('/signin', user.login)
    app.post('/signup', users.register)
    app.post('/create-contact', contact.createContacts)
    app.get('/contacts/:id', show.showContacts)
    app.get('/remove/:id', remove.removeContact)
    app.get('/contacts-details/:contactId', request.contactDetails)
    app.patch('/update-contact/', update.updateContact)

    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });

});