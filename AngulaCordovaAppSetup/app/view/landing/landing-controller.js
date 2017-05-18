'use strict';


module.exports = ['$log', '$location', '$rootScope', landingController];

function landingController($log, $location) {
    $log.debug('landingController');

    let url = $location.url();
    this.showHome = url === '/landing' || '/';
}