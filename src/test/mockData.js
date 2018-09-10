const { ObjectID } = require('mongodb')

module.exports = {
    TEST_DATA_CAST: {
        _id: new ObjectID,
        name: 'John',
        last_name: 'Doe'
    },
    TEST_DATA_MOVIE: {
        _id: new ObjectID,
        movie_name:'Test Movie',
        year:'2000',
        synopsis:'Test synopsis movie',
        quantity:1,
        cast: [new ObjectID]
    },
    TEST_DATA_CLIENT: {
        _id: new ObjectID,
        first_name: 'Test',
        last_name: 'User',
        email: 'test@test.com',
        password: '12345',
        rol: 'Client'
    },
    TEST_DATA_RENT: {
        _id: new ObjectID,
        client_id: new ObjectID,
        payment_type: 'Cash',
        shipping_type: 'Shipping',
        total: 5,
        detail: [new ObjectID]
    }
}