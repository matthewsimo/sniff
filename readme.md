
### sniff

Sniff a directory and create a JSON file of it's children.

`app.js` shows an example of usage. Run it via command line with `$ node app.js` it will render the `/posts/` directory in JSON format at `/posts.json`.


If a file starts with a javascript object, sniff will add those key/value pairs to the data for each item's JSON representation.
