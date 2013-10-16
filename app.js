
var sniff = require('./sniff'),
    fs = require('fs');


/* Sniff posts directory - create the posts.json file. */

var targetDir = 'posts';
var outputFile = 'posts.json';
var postData = sniff.parse(targetDir);

fs.writeFile(outputFile, JSON.stringify(postData), function(err){
  console.log("Writing json to " + outputFile);
  if(err) throw err;
});

