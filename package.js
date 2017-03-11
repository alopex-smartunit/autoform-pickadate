Package.describe({
  name: "smartunit:autoform-pickadate",
  version: "0.1.3",
  summary: "pickadate.js for autoform (for AutoForm 6.0)",
  git: "https://github.com/alopex-smartunit/autoform-pickadate"
});

Package.onUse(function (api, where) {
  api.versionsFrom('1.0.3.1');

  api.use('templating');
  api.use('underscore');
  api.use('jquery');
  api.use('tracker');
  api.use('coffeescript');
  api.use('mquandalle:jade@0.4.1');
  api.use('aldeed:autoform@6.0.0');
  api.use('robertlowe:pickadate@3.5.5');
  api.use('aldeed:template-extension@4.1.0');

  api.addFiles('autoform-pickadate.jade', 'client');
  api.addFiles('autoform-pickadate.coffee', 'client');
});

Package.onTest(function (api) {
});
