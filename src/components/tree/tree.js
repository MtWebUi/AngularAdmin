//-----------------------------------------------------------------------------------------------
//
//
//
//
//
//-----------------------------------------------------------------------------------------------
angular.module('admin.component')
    .directive('uiTree', function (UITreeControl) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                onBeforeClick: '&',
                onClick: '&',
                onBeforeCheck: '&',
                onDataSuccess: '&',
                onDataFail: '&',
                onCheck: '&',

                onAdd: '@',
                onEdit: '@',
                onRemove: '&',

                checked: '=',
                filter: '='
            },
            compile: function () {
                var uiTree = null;
                return {
                    pre: function (s, e, a, c, t) {
                        uiTree = new UITreeControl(s, e, a, t);
                    },
                    post: function () {
                        uiTree.build();
                    }
                };
            },
            template: `
                <div>
                    <ul class="ztree ui-tree"></ul>
                    <span style="display:none">
                        <span ng-if="onAdd" class="button add" ng-click="onAddHandler($event)"></span>
                        <span ng-if="onEdit" class="button edit" ng-click="onEditHandler($event)"></span>
                        <span ng-if="onRemove" class="button remove" ng-click="onRemoveHandler($event)"></span>
                    </span>
                </div>
            `
        };
    });