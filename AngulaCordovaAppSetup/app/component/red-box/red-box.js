'use strict';

module.exports = {
  template: require('./red-box.html'),
  controller: ['$log', '$location', RedBoxController],
  controllerAs: 'redBoxCtrl'
};

function RedBoxController($log, $location) {
  $log.debug('RedBoxController');

}
