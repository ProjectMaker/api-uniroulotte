/* eslint-disable global-require */
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      repositoryUrl: 'git@github.com:ProjectMaker/api-uniroulotte.git',
      workspace: '/tmp/api-uniroulotte',
      deployTo: '/home/uniroulotte/api',
      deleteOnRollback: false,
      ignores: ['.git', 'node_modules'],
      keepReleases: 2
    },
    staging: {
      servers: 'uniroulotte@142.93.14.82',
      branch: 'feature/deploy'
    },
    production: {
      servers: 'uniroulotte@142.93.14.82',
      branch: 'master'
    }
  });
};
