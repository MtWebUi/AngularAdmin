//-----------------------------------------------------------------------------------------------
//
//
//
//
//
//-----------------------------------------------------------------------------------------------
angular.module('admin.component')
    .directive('uiPortletActionPagination', function (PaginationFactory) {
        return {
            restrict: 'E',
            replace: true,
            link: function (scope, element, attrs) {
                var url = attrs.url,
                    pageIndex = attrs.pageIndex,
                    pageSize = attrs.pageSize,
                    pageLimit = attrs.pageLimit,
                    pageDataName = attrs.pageDataName,
                    pageTotalName = attrs.pageTotalName,
                    init = false,
                    paginationFactory = new PaginationFactory(url, pageIndex, pageSize, pageLimit, pageDataName, pageTotalName),
                    handler = function (r) {
                        $.extend(scope, r);
                    };

                //
                scope.setUrl = function (url) {
                    paginationFactory.url = url;
                };

                //
                scope.load = function (index) {
                    index--;
                    if (index != paginationFactory.pageIndex || !init) {
                        init = true;
                        paginationFactory.getPage(index).then(handler);
                    }
                };
                scope.loadFirst = function (isForce) {
                    if(!scope.isFirst || isForce){
                        paginationFactory.prePage().then(handler);
                    }
                };
                scope.loadLast = function (isForce) {
                    if(!scope.isLast || isForce){
                        paginationFactory.nextPage().then(handler);
                    }
                };

                //
                scope.load(1);
            },
            templateUrl: 'tpl.portal.portlet.action.pagination'
        };
    });



