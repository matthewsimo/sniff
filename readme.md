
### sniff

Recursively sniff a directory and create a JSON file of it's children.

`app.js` shows an example of usage. Run it via command line with `$ node app.js` it will render the `/posts/` directory in JSON format at `/posts.json`.


### running

- `git clone git@github.com:matthewsimo/sniff.git`
- `cd sniff`
- `node app.js`


### Disclaier

This was built specifically to parse through a directory of markdown files and render a json representaion of those files.

_A couple of caveats_:

- We parse out a comment at the beginning of each markdown file.
- The comment should wrap a JSON object which basically holds meta data for the file, this object will be merged with the file's outputted JSON object.
- The file name convention used is `XXXX-XX-XX-file-name.md` - this will add the `date` key to the file's object which holds the converted `Date` object.
- The `slug` key is pulled from the file name, anything that isn't part of the date.
- Since this was build specifically to handle a directory of markdown files, we convert everything after the leading comment from markdown into rendered markup. This is then added to the `content` key on the file's object.

