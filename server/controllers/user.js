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
    },

    login: (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;
    
        db.users
          .findOne(
            {
              username,
            },
            {
              fields: ['id', 'username', 'password'],
            }
          )
          .then(user => {
            if (!user) {
              throw new Error('Invalid username');
            }
    
            return argon2.verify(user.password, password).then(valid => {
              if (!valid) {
                throw new Error('Incorrect password');
              }
    
              const token = jwt.sign({ userId: user.id }, secret);
              delete user.password;
              res.status(200).json({ ...user, token });
            });
          })
          .catch(err => {
            if (
              ['Invalid username', 'Incorrect password'].includes(err.message)
            ) {
              res.status(400).json({ error: err.message });
            } else {
              console.error(err);
              res.status(500).end();
            }
          });
      }
}