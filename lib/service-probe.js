/*
    Copyright (C) 2013  Luscus
    <https://github.com/luscus/node-root-probe>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program: see COPYING in the root directory.
    If not, see <http://www.gnu.org/licenses/>.
*/

// load modules
var Path = require('path'),
    os = require('os'),
    ip = require('ip'),
    root = require('root-finder'),
    Git = require(__dirname + '/utils/git'),
    Dependencies = require(__dirname + '/utils/dependencies');

var mainModuleInformation = null;


(function () {
  mainModuleInformation = root;
  mainModuleInformation.type = 'serviceProbe';
  mainModuleInformation.status = 'OK';
  mainModuleInformation.timestamp = new Date();


  mainModuleInformation.hostname = os.hostname();
  mainModuleInformation.ip = ip.address();
  mainModuleInformation.pid = process.pid;

  mainModuleInformation.version = root.package.version;

  mainModuleInformation.id = 'serviceProbe:' + mainModuleInformation.service + ':' + mainModuleInformation.hostname + ':' + process.pid;

  var git_hash,
      dependencies;

  // get git HEAD information if available
  try {
    git_hash = Git.readHeadHash(root.path);
  }
  catch (error) {
  }

  if(git_hash) {
    mainModuleInformation.version_hash = git_hash;
  }


  // get root package dependecies
  try {
    dependencies = Dependencies.update(root);

    mainModuleInformation.dependencies = dependencies;
  }
  catch (error) {
    error.name = 'RootProbeInitException';
    error.message = 'could not read dependencies - ' + error.message;

    throw error;
  }

  return mainModuleInformation;
})();


module.exports = mainModuleInformation;
