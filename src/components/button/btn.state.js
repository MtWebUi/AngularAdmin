//-----------------------------------------------------------------------------------------------
//
//
//
//
//
//-----------------------------------------------------------------------------------------------
(function () {

    class UIStateButton extends Event {
        constructor(scope, element, attrs) {
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.message = new Message('uiStateButton');
        }

        init() {
            if (!this.scope.clickHandler) {
                this.message.error('必须设置on-click属性');
            }
            this.element.click(() => {
                this.disable(true);
                let result = this.scope.clickHandler();
                this.wait(result);
            });
        }

        wait(result) {
            if (result && result.finally) {
                result.finally(() => this.disable(false));
            }
            else {
                this.disable(false);
            }
        }

        disable(isD) {
            //
            if (this.scope.target) {
                Metronic[`${isD ? '' : 'un'}blockUI`](this.scope.target);
            }

            //
            this.element.prop('disabled', isD);
        }
    }

    angular.module('admin.component')
        .directive('uiStateButton', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    target: '@target',
                    clickHandler: '@click'
                },
                link: function (scope, element, attrs) {
                    let button = new UIStateButton(scope, element, attrs);
                    button.init();
                },
                template: `
                    <button type="button" class="btn" ng-transclude></button>
                `
            };
        });
})();