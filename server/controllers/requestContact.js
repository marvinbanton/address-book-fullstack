module.exports = {
    contactDetails: (req, res) => {
        const db = req.app.get('db')
        const { contactId } = req.params

        db.query(`SELECT * FROM contacts WHERE id = ${contactId}`)
            .then(contact => {
                console.log(contact)
                res(201).send({ contact })
            })
            .catch(err => {
                console.log(err)
                res.status(500).end();
            })

    }
}