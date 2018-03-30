(function () {
  'use strict';

  angular.module('app.generators.css')
  .controller('CssAnimationController', ['$rootScope',
    function($rootScope) {
      this.data = {
        type: 'horizontal-move',
        name: 'myMove',
        start: '0',
        end: '200',
        timingFunction: 'linear',
        duration: '2',
        delay: '0',
        iterationCount: '1',
        direction: 'normal'
      };

      this.elementCss = function() {
        var animationCss = '';

        animationCss += 'animation: ' + this.data.name + ' ' + this.data.duration + 's '
        + this.data.timingFunction + ' ' + this.data.delay + 's ';

        if (this.data.iterationCount !== '0') {
          animationCss += this.data.iterationCount;
        }
        else {
          animationCss += 'infinite';
        }

        animationCss += ' ' + this.data.direction + ';';

        return animationCss;
      }

      this.keyframeCss = function() {
        if (this.data.type === 'horizontal-move') {
          return '@keyframes ' + this.data.name + ' {\n    0% { left: ' + this.data.start + 'px; }'
          + '\n    100% { left: ' + this.data.end + 'px; }\n}';
        }
        else if (this.data.type === 'vertical-move') {
          return '@keyframes ' + this.data.name + ' {\n    0% { top: ' + this.data.start + 'px; }'
          + '\n    100% { top: ' + this.data.end + 'px; }\n}';
        }
        else if (this.data.type === 'rotate-spin') {
          return '@keyframes ' + this.data.name + ' {\n    0% { transform: rotate(' + this.data.start + 'deg); }'
          + '\n    100% { transform: rotate(' + this.data.end + 'deg); }\n}';
        }
      }

      $rootScope.pageStyle = this.keyframeCss();

      this.updatePageStyle = function () {
        $rootScope.pageStyle = this.keyframeCss();
      }
  }]);
})();
