'use strict';
//require('./_red-box.scss');
module.exports = {
  template: require('./red-box.html'),
  controller: ['$log', '$location', RedBoxController],
  controllerAs: 'redBoxCtrl'
};

function RedBoxController($log, $location) {
  $log.debug('RedBoxController');

}
