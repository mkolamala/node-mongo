const mongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

mongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
        'campsites')
        .then(result => {
            console.log('Insert Document:\n', result.ops);

            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
                console.log('Found Documents:\n', docs);

            return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test" }, 'campsites');

        })
        .then(result => {
            console.log('Updated Document:\n', result.result);

            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Updated Documents:\n', docs);
                            
            return db.dropCollection('campsites');
        })
        .then(result => {
            console.log('Dropped Collection:', result);

            return client.close();
        })
        .catch(err => console.log(err));

})
.catch(err => console.log(err));