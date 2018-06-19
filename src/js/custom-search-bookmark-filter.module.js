angular
  .module('customSearchBookmarkFilter', [])
  .controller('customSearchBookmarkFilterController', ['customSearchBookmarkFilterItems', '$scope', '$filter', function(items, $scope, $filter) {
    this.$onInit = () => {
      $scope.items = items;
    };
    $scope.translate = (original) => {
      return original.replace(/\{(.+)\}/g, (match, p1) => $filter('translate')(p1));
    };
    $scope.goToUrl = (url) => {
      window.open(url, '_blank');
    };
  }])
  .component('customSearchBookmarkFilter', {
    controller: 'customSearchBookmarkFilterController',
    template: `<button ng-repeat="item in items" data-href="{{ item.action }}" aria-label="{{ translate(item.description) }}" ng-click="goToUrl(translate(item.action))" class="button-with-icon search-bookmark-filter zero-margin md-button {{item.cssClasses}}" type="button">
                <md-tooltip md-direction="bottom" md-delay="500">{{ translate(item.description) }}</md-tooltip><prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{item.icon.set}}" icon-definition="{{item.icon.icon}}"></prm-icon>
                <span class="custom_search_bookmark_filter_item hide-xs">{{ translate(item.name) }}</span>
              </button>`

  });
