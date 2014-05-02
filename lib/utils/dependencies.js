/*jshint -W002 */
var fs = require('fs'),
    Path = require('path'),
    root;


module.exports = {
  update: function (module_root) {
    root = module_root;
    return updateSubmoduleInfo();
  }
};


function updateSubmoduleInfo () {
  var directories = findDependencyDirectories(),
      dependencies = [],
      idx = directories.length;

  while (idx--) {
    var folder = {};

    folder.lib_folder = directories[idx];
    folder.path = root.path + Path.sep + folder.lib_folder;
    folder.lib_type = (directories[idx] === 'node_modules') ? 'node' : 'bower';

    // list subdirectories (packages)
    folder.packages = fs.readdirSync(folder.lib_folder);

    analyseDependencies(folder);

    dependencies = dependencies.concat(folder.package_information);
  }

  return dependencies;
}


function analyseDependencies (folder) {
  var data = {},
      module_folder,
      module = {},
      idx = folder.packages.length,
      index = 0,
      package = null;

  folder.package_information = [];

  // for each package retrieve the wanted information
  while (idx--) {

    // ignore hidden directories (starting with .xyz)
    if (folder.packages[idx].indexOf('.')) {
      data = {};

      data.lib_type = folder.lib_type;
      data.lib_folder = folder.lib_folder;
      data.module = folder.packages[idx];
      data.module_folder = folder.lib_folder + Path.sep + folder.packages[idx];

      // check if package information has been found
      if (readDependencyInfo(data)) {

        // push the formated JSON
        folder.package_information.push(formatDependencyInformation(data));
      }
    }
  }
}


function formatDependencyInformation (data) {
  var package = data.module_info,
      module = {};

  module.type = data.lib_type;

  if (data.lib_type === 'node')
    module.production = (root.package.dependencies[data.module]) ? true : false;
  else
    module.production = (root.bower.dependencies[data.module]) ? true : false;

  module.path = data.module_folder;
  module.name = package.name;
  module.version = package.version;

  if (package.description)
    module.description = package.description;
  if (package.keywords)
    module.keywords = package.keywords;
  if (package.homepage)
    module.homepage = package.homepage;
  if (package.repository)
    module.repository_url = package.repository.url;
  if (package.engines)
    module.engines_node = package.engines.node;

  return module;
}


function readDependencyInfo (data) {
  var buffer;

  try {
    // Read package.json
    buffer = fs.readFileSync(data.module_folder + Path.sep + 'package.json');
    data.module_info = JSON.parse(buffer);

    return true;
  }
  catch (err) {
    try {
      // package.json was not found
      // read bower.json
      buffer = fs.readFileSync(data.module_folder + Path.sep + 'bower.json');
      data.module_info = JSON.parse(buffer);

      return true;
    }
    catch (err) {
      // no information were found
      // this directory is not a valid package: ignore it.
      return false;
    }
  }
}


function findDependencyDirectories () {
  var directories = [];

  if (fs.existsSync(root.path + Path.sep + 'node_modules')) {
    // Add the standard node_modules directory
    directories.push('node_modules');
  }


  try {
    // Check if bower.json exists
    require(root.path + Path.sep + 'bower.json');

    try {
      // load the custom location of the bower modules
      var file = fs.readFileSync(root.path + Path.sep + '.bowerrc'),
          content = JSON.parse(file);

      directories.push(content.directory);
    }
    catch (ex) {
      // no custom location, add default folder
      directories.push('bower_modules');
    }
  }
  catch (ex) {
    // no bower in use
  }


  return directories;
}
