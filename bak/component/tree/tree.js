//-----------------------------------------------------------------------------------------------
//
//
//
//
//
//-----------------------------------------------------------------------------------------------
angular.module('admin.component')
    .directive('uiTree', function (uiTreeFactory, componentHelper) {
        return {
            restrict: 'E',
            replace: true,
            link: function (scope, element, attrs) {
                var uiTree = uiTreeFactory(scope, element, attrs);
                componentHelper.tiggerComplete(scope, attrs.ref || '$tree', uiTree);
            },
            template: function (element, attrs) {
                attrs.treeId = new Date().getTime();
                return '<ul id="tree' + attrs.treeId + '" class="ztree" style="width:100%; overflow:auto;"></ul>';
            }
        };
    });