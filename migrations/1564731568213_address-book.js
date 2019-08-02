exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('address_book', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        user_id: {
            type: 'serial',
            references: 'users',
            notNull: true,
        },
        group_id: {
            type: 'serial',
            notNull: true
        }
    })
};

exports.down = (pgm) => {

};
