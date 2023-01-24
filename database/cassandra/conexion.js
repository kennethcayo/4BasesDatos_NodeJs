const cassandra = require('cassandra-driver');
const e = require('cors');

const client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'login',
    protocolOptions: { port: 9042 }
});

client.connect(function(err,result){
    if(err) {
        throw err;
    }else{
        console.log('cassandra conectado');

    };
});


module.exports = client;