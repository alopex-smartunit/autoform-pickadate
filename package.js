Package.describe({
  name: "smartunit:autoform-pickadate",
  version: "0.1.4",
  summary: "pickadate.js for autoform",
  git: "https://github.com/alopex-smartunit/autoform-pickadate"
});

Package.onUse(function (api, where) {
  api.versionsFrom('1.6');

  api.use('templating');
  api.use('underscore');
  api.use('jquery');
  api.use('tracker');
  api.use('aldeed:autoform');
  api.use('robertlowe:pickadate');
  api.use('aldeed:template-extension');

  api.addFiles('autoform-pickadate.html', 'client');
  api.addFiles('autoform-pickadate.js', 'client');
});

Package.onTest(function (api) {
});
