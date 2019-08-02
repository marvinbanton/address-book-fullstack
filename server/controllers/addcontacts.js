module.exports = {
    createContacts: (req, res) => {
        const db = req.app.get('db')

        const { firstName, lastName, email, mobileNumber, homePhone, workPhone, city, state, postalCode, country, uid } = req.body

        db.address_book
            .findOne({
                user_id: uid
            })
            .then((createcontact) => {
                return db.contacts
                    .insert({
                        address_book: createcontact.id,
                        first_name: firstName,
                        last_name: lastName,
                        email,
                        mobile_phone: mobileNumber,
                        home_phone: homePhone,
                        work_phone: workPhone,
                        city: city,
                        state_or_province: state,
                        postal_code: postalCode,
                        country: country,
                    })
            })
            .then(contact => res.status(201).json(contact))
            .catch(err => {
                console.log(err)
                res.status(500).end();
            })
    }
}


