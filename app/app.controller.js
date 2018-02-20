(function () {
  'use strict';

  angular.module('app')
  .controller('AppController', [
    '$rootScope',
    '$breadcrumb',
    '$window',
    'pageInfoService',

    function($rootScope, $breadcrumb, $window, pageInfoService) {
      var ctrl = this;

      // Declare an empty JSON-LD object.
      ctrl.jsonLd = {};

      // Do stuff when the state changes.
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        // Set the root path of the current state to determine the theme color.
        var path = toState.templateUrl.split('/')[1];
        pageInfoService.setPath(path);

        // Set the body background color.
        ctrl.bodyColor = pageInfoService.getPageThemeColor() + '-500';

        // Set the page meta title.
        $window.document.title = toState.metaTags.title;
        // Set the page meta description.

        $window.document.getElementsByName('description')[0].setAttribute('content', toState.metaTags.description);
        // Set on-page title.
        $rootScope.pageTitle = toState.title;
        // Initialize the custom page style to empty.
        $rootScope.pageStyle = '';

        // Set the breadcrumbs to be used in the JSON-LD.
        ctrl.breadcrumbs = $breadcrumb.getStatesChain();

        // Set the JSON-LD.
        setJsonLd();

        // Scroll to the top.
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });

      // The page's JSON-LD.
      function setJsonLd() {
        ctrl.jsonLd = {
          "@context": "http://schema.org/",
          "@type": "WebPage",
          "author": {
            "@type": "Person",
            "name": "Jason Macfarlane"
          },
          "copyrightHolder": {
            "@type": "Person",
            "name": "Jason Macfarlane"
          },
          "headline": $rootScope.pageTitle,
          "description": $rootScope.pageDescription,
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              // Dynamically added from loop below.
            ]
          }
        };

        // Add the bradcrumbs to the JSON-LD.
        for (var i = 0; i < ctrl.breadcrumbs.length; ++i) {
          ctrl.jsonLd.breadcrumb.itemListElement.push({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "url": ctrl.breadcrumbs[i].url,
              "name": ctrl.breadcrumbs[i].title
            }
          });
        }
      }

      // Used for ngRepeat between a range.
      // Source: http://stackoverflow.com/questions/11873570/angularjs-for-loop-with-numbers-ranges
      $rootScope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
          input.push(i);
        }
        return input;
      };
  }]);
})();
