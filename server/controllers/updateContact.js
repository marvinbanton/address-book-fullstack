module.exports = {
    updateContact: (req, res) => {
        const db = req.app.get('db')
        const { id, firstName, lastName, email, mobileNumber, homePhone, workPhone, city, state, postalCode, country } = req.body
        console.log(id)
        db.query(`UPDATE contacts SET 
            first_name = '${firstName}',
            last_name = '${lastName}',
            email = '${email}',
            mobile_phone = '${mobileNumber}',
            home_phone = '${homePhone}',
            work_phone = '${workPhone}',
            city = '${city}',
            state_or_province = '${state}',
            postal_code = '${postalCode}',
            country = '${country}'

            WHERE id = '${id}'
            `)
            .then(update => res.status(201).send(update))
            .catch(err => {
                console.log(err)
                res.status(500).end();
            })
    }
}