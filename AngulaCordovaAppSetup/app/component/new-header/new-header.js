'use strict';
//require('./_new-header.scss');
module.exports = {
    template: require('./new-header.html'),
    controller: ['$log', '$location', NewHeaderController],
    controllerAs: 'newHeaderCtrl'
};

function NewHeaderController($log, $location) {
    $log.debug('newHeaderController');
    
}

