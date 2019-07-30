import template from './template.html';

angular
  .module('customSearchBookmarkFilter', [])
  .controller('customSearchBookmarkFilterController', ['customSearchBookmarkFilterItems', '$scope', '$filter', function(items, $scope, $filter) {
    this.$onInit = () => {
      $scope.items = items;
    };
    $scope.translate = (original) => {
      return original.replace(/\{(.+?)\}/g, (match, p1) => $filter('translate')(p1));
    };
    $scope.goToUrl = (url) => {
      window.open(url, '_blank');
    };
  }])
  .component('customSearchBookmarkFilter', {
    controller: 'customSearchBookmarkFilterController',
    template
  });
