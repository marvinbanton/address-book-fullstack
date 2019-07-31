exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users_profile', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        fname: {
            type: 'text',
            notNull: true,
        },
        lname: {
            type: 'text',
            notNull: true
        },
        email: {
            type: 'text',
            notNull: true,
        }
    });

};

exports.down = (pgm) => {

};
