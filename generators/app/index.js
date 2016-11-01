'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slug = require('slug');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantastic ' + chalk.red('generator-polymer-init-qairoe-starter-kit') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What would you like this project to be named?',
      default: 'Little Qairoes Project'
    }, {
      type: 'input',
      name: 'projectDescription',
      message: 'Give a brief description of the project',
      default: 'This is a brief description of the Little Qairoes Project'
    }, {
      type: 'input',
      name: 'projectShortName',
      message: 'Give a short name (one word name) of the project',
      default: 'Qairoes'
    }, {
      type: 'input',
      name: 'projectAuthor',
      message: 'Who is the author of this project?',
      default: ''
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      props.projectNameSlugged = slug(props.projectName.trim().toLowerCase());
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    //var projectName = this.props.projectName;
    var projectNameSlugged = this.props.projectNameSlugged;
    //var projectDescription = this.props.projectDescription;
    
    // Copies all files that doesn't have an underscore, and also replacing the
    // placeholders with values from the prompts
    this.fs.copyTpl(
      this.templatePath() + '/**/!(_)*',
      this.destinationPath(),
      this.props
    );
    
    // This area copies all the files with underscores one by one
    
    // Copies the _variables.scss
    this.fs.copyTpl(
      this.templatePath('styles/_variables.scss'),
      this.destinationPath('styles/_variables.scss'),
      this.props
    );
    
    // Copies the _mixins.scss
    this.fs.copyTpl(
      this.templatePath('styles/_mixins.scss'),
      this.destinationPath('styles/_mixins.scss'),
      this.props
    );
    
    // Copies the app-shell
    this.fs.copyTpl(
      this.templatePath('core/_project-app-shell.html'),
      this.destinationPath('core/' + projectNameSlugged + '-app-shell.html'),
      this.props
    );
    
    // Copies the web-components here
    // Copies the header
    this.fs.copyTpl(
      this.templatePath('web-components/_project-header/_project-header.html'),
      this.destinationPath('web-components/' + projectNameSlugged + '-header/' + projectNameSlugged + '-header.html'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('web-components/_project-header/_project-header-style.html'),
      this.destinationPath('web-components/' + projectNameSlugged + '-header/' + projectNameSlugged + '-header-style.html'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('web-components/_project-header/_project-header-style.scss'),
      this.destinationPath('web-components/' + projectNameSlugged + '-header/' + projectNameSlugged + '-header-style.scss'),
      this.props
    );
    
    // Copies the drawer
    this.fs.copyTpl(
      this.templatePath('web-components/_project-drawer/_project-drawer.html'),
      this.destinationPath('web-components/' + projectNameSlugged + '-drawer/' + projectNameSlugged + '-drawer.html'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('web-components/_project-drawer/_project-drawer-style.html'),
      this.destinationPath('web-components/' + projectNameSlugged + '-drawer/' + projectNameSlugged + '-drawer-style.html'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('web-components/_project-drawer/_project-drawer-style.scss'),
      this.destinationPath('web-components/' + projectNameSlugged + '-drawer/' + projectNameSlugged + '-drawer-style.scss'),
      this.props
    );
    
    // Copies the icons
    this.fs.copy(
      this.templatePath('web-components/_project-icons/_project-icons.html'),
      this.destinationPath('web-components/' + projectNameSlugged + '-icons/' + projectNameSlugged + '-icons.html') 
    );
    
    // Copies all files in the images
    this.fs.copy(
      this.templatePath('images/_favicon.ico'),
      this.destinationPath('images/favicon.ico') 
    );
    this.fs.copy(
      this.templatePath('images/manifest/_icon-48x48.png'),
      this.destinationPath('images/manifest/icon-48x48.png') 
    );
    this.fs.copy(
      this.templatePath('images/manifest/_icon-72x72.png'),
      this.destinationPath('images/manifest/icon-72x72.png') 
    );
    this.fs.copy(
      this.templatePath('images/manifest/_icon-96x96.png'),
      this.destinationPath('images/manifest/icon-96x96.png') 
    );
    this.fs.copy(
      this.templatePath('images/manifest/_icon-144x144.png'),
      this.destinationPath('images/manifest/icon-144x144.png') 
    );
    this.fs.copy(
      this.templatePath('images/manifest/_icon-192x192.png'),
      this.destinationPath('images/manifest/icon-192x192.png') 
    );
    this.fs.copy(
      this.templatePath('images/manifest/_icon-512x512.png'),
      this.destinationPath('images/manifest/icon-512x512.png') 
    );
    
    // Creates hidden files for git
    this.write('.gitattributes', '* text=auto');
    this.write('.gitignore', 'bower_components/\nbuild/\nnode_modules/');
    this.write('.travis.yml', 'language: node_js\n' +
                              'sudo: required\n' +
                              'dist: trusty\n' +
                              'addons:' +
                              '  firefox: \'46.0\'\n' +
                              '    apt:\n' +
                              '      sources:\n' +
                              '        - google-chrome\n' +
                              '      packages:\n' +
                              '        - google-chrome-stable\n' +
                              'node_js:\n' +
                              '  - \'6\'\n' +
                              '  - \'5\'\n' +
                              '  - \'4\'\n' +
                              'before_script:\n' +
                              '  - npm install -g bower polymer-cli\n' +
                              '  - bower install\n'+
                              'script:\n' +
                              '  - xvfb-run polymer test');
  },

  install: function () {
    this.installDependencies();
  }
});
