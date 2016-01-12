'use strict';
var generators = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');
var fs = require('fs');

module.exports = generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      name    : 'appDir',
      message : 'App\'s directory ?',
      default : ".",
    }];

    this.prompt(prompts, function (props) {
      for (var prop in props) {
        this[prop] = props[prop];
      }
      done();
    }.bind(this));
  },

  writing: function () {
    var appDir = this.appDir;
    var generator = this;

    if (appDir !== ".") {
      fs.exists(appDir, function (exists) {
        if (exists) {
          generator.log(chalk.red('Cannot proceed. A app folder already exists at: ') + appDir);
          process.exit();
        }
      });
    }

    this.fs.copy(
      this.templatePath('webapp/**/*'),
      this.destinationPath(appDir)
    );
  },
});
