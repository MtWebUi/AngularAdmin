//------------------------------------------------------
//
//
//
//
//
//------------------------------------------------------
angular.module('admin.component')
    .constant('defaultCol', '2:10')
    .directive('uiForm', function (UIFormControl) {
        return {
            restrict: 'E',
            replace: true,
            scope: false,
            transclude: true,
            compile: function () {
                var form = null;
                return {
                    pre: function (scope, element, attrs, controller, transclude) {
                        form = new UIFormControl(scope, element, attrs, transclude(scope));
                    },
                    post: function () {
                        form.layout();
                    }
                };
            },
            template: `
                <form action="#" class="form-horizontal">
                    <div class="form-body">
                    </div>
                </form>
            `
        };
    });


