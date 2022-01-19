const logger = require('tracer').console({
  format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})'
});

module.exports = logger;
