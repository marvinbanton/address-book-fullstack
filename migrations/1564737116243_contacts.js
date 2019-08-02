exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('contacts', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        address_book: {
            type: 'serial',
            references: 'address_book',
            notNull: true
        },
        first_name: {
            type: 'text',
            notNull: true
        },
        last_name: {
            type: 'text',
            notNull: true
        },
        email: {
            type: 'text',
            notNull: true
        },
        mobile_phone: {
            type: 'text',
            notNull: true
        },
        home_phone: {
            type: 'text',
            notNull: false
        },
        work_phone: {
            type: 'text',
            notNull: false
        },
        city: {
            type: 'text',
            notNull: true
        },
        state_or_province: {
            type: 'text',
            notNull: true
        },
        postal_code: {
            type: 'text',
            notNull: true
        },
        country: {
            type: 'text',
            notNull: true
        }
    })
};

exports.down = (pgm) => {

};
