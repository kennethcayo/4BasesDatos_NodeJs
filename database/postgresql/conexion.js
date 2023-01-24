const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'kennethcayo',
    host: 'localhost',
    database: 'login',
    password: '',
});
module.exports= pool;




 






































/* const { Client } = require('pg')
const connectionData = {
    user: 'luis',
    host: 'postgresql-106052-0.cloudclusters.net',
    database: 'datos',
    password: '1350295785',
    port: 10221,
}
const client = new Client(connectionData)
console.log(client)

client.connect()
client.query('SELECT * FROM table')
    .then(response => {
        console.log(response.rows)
        client.end()
    })
    .catch(err => {
        client.end()
    })


const createUser = (request, response) => {

    Client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
} */