import customSearchBookmarkFilterItems from './fixtures/customSearchBookmarkFilterItems';

describe('customSearchBookmarkFilter component', () => {
  beforeEach(module('customSearchBookmarkFilter', ($provide) => {
    $provide.constant("customSearchBookmarkFilterItems", customSearchBookmarkFilterItems);
    $provide.value("translateFilter", (original) => original);
  }));

  let $compile, $rootScope, element;
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    const scope = $rootScope.$new();
    element = $compile("<custom-search-bookmark-filter />")(scope);
    // element is a jqlite object
    scope.$digest();
  }));

  describe('template layout', () => {

    let btns;
    beforeEach(() => {
      btns = element.children();
    });

    it('should have number of button(s) at top-level based on config', () => {
      expect(element.children().length).toEqual(customSearchBookmarkFilterItems.length);

      Array.from(btns).forEach(btn => {
        expect(btn.tagName).toEqual('BUTTON');
      });
    });

    describe('buttons', () => {

      it('should have ng-click directive', () => {
        Array.from(btns).forEach(btn => {
          const ngClick = btn.getAttribute('ng-click');
          expect(ngClick).toBeTruthy();
        });
      });

      it('should link to action property', () => {
        Array.from(btns).forEach((btn, idx) => {
          const href = btn.getAttribute('data-href');
          expect(customSearchBookmarkFilterItems[idx].action).toContain(href);
        });
      });

      it('should map CSS classes', () => {
        Array.from(btns).forEach((btn, idx) => {
          const classes = btn.className;
          expect(classes).toContain(customSearchBookmarkFilterItems[idx].cssClasses);
        });
      });

      it('should contain primo icons with mapped attributes', () => {
        Array.from(btns).forEach((btn, idx) => {
          const iconEl = btn.querySelector('prm-icon');
          const iconSet = iconEl.getAttribute('svg-icon-set');
          const iconDef = iconEl.getAttribute('icon-definition');

          expect(iconSet).toEqual(customSearchBookmarkFilterItems[idx].icon.set);
          expect(iconDef).toEqual(customSearchBookmarkFilterItems[idx].icon.icon);
        });
      });

    });
  });

});
