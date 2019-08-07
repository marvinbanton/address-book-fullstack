module.export = {
    removeContact: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.query(`DELETE FROM contacts WHERE id = ${id}`)
            .then(res => res.status(201).send(res))
            .catch(err => {
                console.log(err)
                res.status(500).end()
            })
    }
}