# [service-probe](https://github.com/luscus/node-service-probe)

[![NPM](https://nodei.co/npm/service-probe.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/service-probe/)

[![NPM version](https://img.shields.io/npm/v/service-probe.svg?style=flat)](https://www.npmjs.com/package/service-probe "View this project on NPM")
[![David](https://img.shields.io/david/luscus/service-probe.svg?style=flat)](https://david-dm.org/luscus/service-probe)
[![David](https://img.shields.io/david/dev/luscus/service-probe.svg?style=flat)](https://david-dm.org/luscus/service-probe#info=devDependencies)
[![NPM license](https://img.shields.io/npm/l/service-probe.svg?style=flat)](https://www.npmjs.com/package/service-probe "View this project on NPM")
[![Omniref](https://img.shields.io/badge/Omniref-docs-orange.svg?style=flat)](https://www.omniref.com/js/npm/service-probe)
[![flattr](https://img.shields.io/badge/flattr-donate-yellow.svg?style=flat)](http://flattr.com/thing/3817419/luscus-on-GitHub)

The 'service-probe' returns information (such as dependecies) about the first parent module in the path hierarchy.


Take a look to the [TODO](https://github.com/luscus/node-service-probe/blob/master/TODO.md) if you want to help towards the next steps.



## Installation

### Node Dependencies

Add following line to your project dependencies

    "service-probe": "0.1.x",

then hit

    npm install

### Require module

    var probe = require('service-probe');


## Usage

*[property] means the property is only set it a value was found*

### Probe Object

The Probe is an extention of the Root Object provided by the **[root-finder](https://github.com/luscus/node-root-finder)** package


service-probe adds following properties to the Root Object:

* `status`: 'OK' if the probe was processed without problems, 'ERROR' otherwise
* `timestamp`: the time at which the probe was generated
* `hostname`: the name of the host
* `pid`: the process id
* `ip`: the ip address from the network adapter
* `version`: the version of the package
* `[version_hash]`: the parsed content of .git/HEAD
* `dependencies`: the parent module's dependencies as array of objects formated as follows

### Dependecy Object

* `type`: string - specifies it is a Node ('node') or Bower ('bower') dependency
* `production`: boolean - specifies it is a production dependency
* `path`: string - path to the dependency
* `name`: string - the name dependency module
* `version`: string - the dependency module's version
* `[description]`: string - the dependency module's description
* `[keywords]`: array of strings - the dependency module's keywords
* `[homepage]`: string - the dependency module's homepage
* `[repository_url]`: string - the dependency module's repository_url
* `[engines_node]`: string - the dependency module's supported version of node


### Access Values

Access the values with the point notation:

    var probe = require('service-probe');

    // get parent module's name
    probe.name

    // get root path
    probe.path

    // get list of dependencies
    probe.dependencies
