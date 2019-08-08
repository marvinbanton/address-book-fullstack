module.exports = {
    removeContact: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.query(`DELETE FROM contacts WHERE id = ${id}`)
            .then(response => res.status(201).send(response))
            .catch(err => {
                console.log(err)
                res.status(500).end()
            })
    }
}