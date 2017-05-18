'use strict';

module.exports = ['$log', '$location', '$rootScope', homeController];

function homeController($log, $location) {
    $log.debug('homeController');

    let url = $location.url();
    this.showHome = url === '' || '/home';
}