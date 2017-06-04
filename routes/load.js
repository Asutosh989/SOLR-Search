/* eslint-disable no-console */
const solr = require('solr-client');
const stories = require('./../hn-topstories');

const client = solr.createClient({
    host: 'localhost',
    port: 8983,
    core: 'top',
    solrVersion: 6.5
});

stories.forEach((story) => {
    delete story.kids;
    client.add(story, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            console.log('Solr response:', obj);
        }
    });
});

client.commit(); // save changes
