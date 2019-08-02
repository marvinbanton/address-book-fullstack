const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret');

module.exports = {
    register: (req, res) => {
        const db = req.app.get('db')

        const { firstName, lastName, email, username, password } = req.body


        argon2
            .hash(password)
            .then((hash) => {
                return db.users
                    .insert({
                        username,
                        password: hash
                    },{
                        fields: [ 'id', 'username']
                    }
                    )
            })
            .then(user => {
                db.users_profile
                    .insert({
                        fname: firstName,
                        lname: lastName,
                        email
                    })
            .then(
                db.address_book
                    .insert({
                        user_id: user.id
                    })
            )
                console.log(user)
                const token = jwt.sign({ userId: user.id }, secret);
                res.status(201).json({ ...user, token });
            })
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    }
}