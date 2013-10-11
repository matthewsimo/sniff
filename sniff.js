var fs = require('fs'),
path = require('path'),
sniff = sniff || {};


var metaRegExp = new RegExp(/\{(\s|\S)+\}/);
var dateRegExp = new RegExp(/\d\d\d\d\-\d\d\-\d\d/);
var fileRegExp = new RegExp(/^\d+-\d+-\d+-([\w\d-]*)\.md/);

/* Parse
 * Accepts a directory path
 * Returns root/children in json object
 */
sniff.parse = function(root) {

  var stats = fs.lstatSync(root),
  info = {};

  if (stats.isDirectory()) {
    info[path.basename(root)] = fs.readdirSync(root).map(function(child) {
      return sniff.parse(root + '/' + child);
    });
  } else {

    info[path.basename(root)] = {};

    var fileContent = fs.readFileSync(root, 'utf-8');
    var meta = fileContent.match(metaRegExp);

    if(meta !== null) {
      info[path.basename(root)] = JSON.parse(meta[0]);
      info[path.basename(root)]["content"] = fileContent.replace(meta[0], "");
    } else {
      info[path.basename(root)]["content"] = fileContent;
    }

    info[path.basename(root)]["slug"] = sniff.calcSlug(path.basename(root));
    info[path.basename(root)]["date"] = sniff.calcDate(root);

  }

  return info;
}

sniff.calcSlug = function(fileName) {

  var r = fileName.match(fileRegExp);
  return r[1];

}

sniff.calcDate = function(filePath) {

  var r = filePath.match(dateRegExp);
  return new Date(r[0]);

}

module.exports = sniff;
