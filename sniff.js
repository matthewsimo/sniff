var fs = require('fs-extra'),
    path = require('path'),
    marked = require('marked'),
    sniff = sniff || {};


var metaRegExp = new RegExp(/<!--\s*(\{(\s|\S)+\})\s*-->/);
var dateRegExp = new RegExp(/\d\d\d\d\-\d\d\-\d\d/);
var fileRegExp = new RegExp(/^\d+-\d+-\d+-([\w\d-]*)\.md/);

/* Parse
 * Accepts a directory path
 * Returns root/children recursively in json object
 */
sniff.parse = function(root) {

  var stats = fs.lstatSync(root);

  if (stats.isDirectory()) {
    var info = {};
    info = fs.readdirSync(root).filter(sniff.isValidFile).map(function(child) {
      return sniff.parse(root + '/' + child);
    });
  } else {
    var info = {};

    var fileContent = fs.readFileSync(root, 'utf-8');
    var meta = fileContent.match(metaRegExp);

    if(meta !== null) {
      info = JSON.parse(meta[1]);
      marked(fileContent.replace(meta[0], ""), {}, function(err, content){
        if(err) throw err;
        info["content"] = content;
      });
    } else {
      info["content"] = marked(fileContent, {}, function(err, content){
        if(err) throw err;
        info["content"] = content;
      });
    }

    info["file"] = path.basename(root);
    info["slug"] = sniff.calcSlug(path.basename(root));
    info["date"] = sniff.calcDate(root);

  }

  return info;

}

sniff.calcSlug = function(fileName) {

  var r = fileName.match(fileRegExp);
  if(r !== null)
    return r[1];

  return '';
}

sniff.calcDate = function(filePath) {

  var r = filePath.match(dateRegExp);

  if(r !== null)
    return new Date(r[0]);

  return '';

}

sniff.isValidFile = function(child){
  return (child !== '.DS_store' && child.indexOf('.') !== 0);
}

module.exports = sniff;
