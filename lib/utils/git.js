var fs = require('fs'),
    Path = require('path');

exports.readHeadHash = function (root_path) {
  var file = fs.readFileSync(root_path + Path.sep +'.git/HEAD'),
      content = file.toString().replace('\n','');

  if (content === 'ref: refs/heads/master')
    return 'master';

  return content;
};
