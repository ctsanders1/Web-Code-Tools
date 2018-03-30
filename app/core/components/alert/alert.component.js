(function () {
  'use strict';

  angular.module('app.core.components')
  .component('alert', {
    templateUrl: 'core/components/alert/alert.template.html',
    controller: ['$timeout', 'alertService',
      function($timeout, alertService) {
        var ctrl = this;

        ctrl.showAlert = false;

        ctrl.alertsQueue = [];

        alertService.getAlertsQueue().then(function(data) {
          ctrl.alertsQueue = data.alerts;
          $timeout(displayAlert, 10000);
        });

        // Displays the alert.
        function displayAlert() {
          var showAlert = localStorage.getItem('wct-show-alert');

          if (showAlert === null || showAlert === 'true') {
            ctrl.showAlert = true;
          }
        }

        // Remove the alert from the queue.
        function removeAlertFromQueue() {
          ctrl.alertsQueue.splice(0, 1);
        }

        // Closes an alert.
        ctrl.closeAlert = function() {
          // Set 'showAlert' to false to hide any other alert that may
          // be in the queue.
          ctrl.showAlert = false;
          // Set local storage so that the alert isn't shown again.
          var showAlert = localStorage.setItem('wct-show-alert', 'false');
          // Give time for the ngHide to animate, so remove from
          // queue after a little delay.
          $timeout(removeAlertFromQueue, 1000);
          // Show the next alert in 5 seconds.
          // $timeout(displayAlert, 5000);
        };
      }
    ]
  });
})();
