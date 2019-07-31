module.exports = {
    register: (req, res) => {
        const db = req.app.get('db')

        const { firstName, lastName, email, username, password } = req.body

        db.users
            .insert({
                username,
                password,
            }
            )
            .then(user => {
                db.users_profile
                    .insert({
                        fname: firstName,
                        lname: lastName,
                        email
                    })
                res.status(201).json(user)
            })
            .catch(err => {
                console.error(err);
            });
    }
}