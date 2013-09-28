
var sniff = require('./sniff'),
    fs = require('fs');


/* Sniff posts directory - create the posts.json file. */

var postData = sniff.parse('posts');

fs.writeFile('posts.json', JSON.stringify(postData), function(err){
  if(err) throw err;
});

