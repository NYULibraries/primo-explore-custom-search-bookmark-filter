import customSearchBookmarkFilterItems from './fixtures/customSearchBookmarkFilterItems';

describe('customSearchBookmarkFilterController', () => {
  let $componentController, $scope;
  let controller;

  beforeEach(module('customSearchBookmarkFilter', ($provide) => {
    $provide.constant("customSearchBookmarkFilterItems", customSearchBookmarkFilterItems);
    $provide.value("translateFilter", (original) => original + "!");
  }));

  beforeEach(inject(function(_$rootScope_, _$componentController_) {
    $scope = _$rootScope_;
    $componentController = _$componentController_;

    controller = $componentController('customSearchBookmarkFilter', { $scope });
  }));

  beforeEach(() => {
    spyOn(window, 'open').and.stub();
  });

  describe('$onInit', () => {
    it('should set items array in scope', () => {
      controller.$onInit();
      const scopeAssignments = Object.keys($scope)
                                .filter(k => k[0] !== '$')
                                .map(k => $scope[k]);

      expect(scopeAssignments).toContain(customSearchBookmarkFilterItems);
    });
  });

  describe('translate', () => {
    it('should pass through text not in curly braces', () => {
      expect($scope.translate('My Value')).toEqual("My Value");
    });
    it('should translate text within curly braces', () => {
      expect($scope.translate('My {CONFIG_VALUE} value')).toEqual("My CONFIG_VALUE! value");
    });
    it('should translate multiple curly braces', () => {
      expect($scope.translate('My {CONFIG_VALUE} value {CONFIG_VALUE}')).toEqual("My CONFIG_VALUE! value CONFIG_VALUE!");
    });
  });


  describe('goToUrl', () => {
    it('should open the given url in a new window', () => {
      const url = 'http://example.com';
      $scope.goToUrl(url);
      expect(window.open).toHaveBeenCalledWith(url, '_blank');
    });
  });
});
