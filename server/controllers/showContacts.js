module.exports = {
    showContacts: (req, res) => {
        const db = req.app.get('db')
        const { address_book, id } = req.params

        db.query(`SELECT * FROM address_book, contacts WHERE address_book.id = contacts.address_book AND address_book.user_id = ${id} ORDER BY contacts.first_name ASC`)
            .then(response => res.status(201).send(response))
            .catch(err => {
                console.log(err)
                res.status(500).end();
            })
    }
}