module.exports = {
    showContacts: (req, res) => {
        const db = req.app.get('db')
        const { address_book, id } = req.body

        db.contacts
            .find({
                address_book: id
            })
            .then(show => res.status(201).json(show))
            .catch(err => {
                console.log(err)
                res.status(500).end();
            })
    }
}