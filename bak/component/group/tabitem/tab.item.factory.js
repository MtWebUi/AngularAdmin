//------------------------------------------------------
//
//
//
//
//
//------------------------------------------------------
angular.module('admin.component')
    .factory('uiTabItemFactory', function ($compile, msg, ajax, Event) {
        var m = new msg('TabItem'),
            TabItem = function (scope, element, attrs, $content) {
                Event.call(this);
                this.scope = scope;
                this.element = element;
                this.content = $content ? this.wrapperContent($content) : null;
                this.elementTitle = element.find('span');
                this.attrs = attrs;
                this.scope = scope;
                this.items = [];
                this.dropdown = element.parent().hasClass('dropdown-menu');
            };
        TabItem.prototype = {

            /**
             *
             */
            onClickHandler: function () {
                this.$emit('uitabitem.active', this);
            },

            /**
             *
             */
            onRemoveHandler: function (evt) {
                var index = this.getIndex();
                if (this.content) {
                    this.content.remove();
                }
                if (this.element) {
                    this.element.remove();
                }
                this.$emit('uitabitem.remove', this, index);
                delete this.listenerMap;
                evt.stopPropagation();
            },

            /**
             *
             * @param fn
             */
            onActive: function (fn) {
                this.$on('uitabitem.active', fn);
            },

            /**
             *
             */
            onRemove: function (fn) {
                this.$on('uitabitem.remove', fn);
            },

            /**
             *
             * @param isActive
             */
            active: function (isActive) {
                var $dom = null;
                if (this.dropdown) {
                    $dom = this.element.parent().parent();
                }
                else {
                    $dom = this.element;
                }
                $dom[isActive ? 'addClass' : 'removeClass']('active');
                return this;
            },

            /**
             *
             */
            wrapperContent: function (c) {
                return $('<div/>').addClass('tab-pane fade').append(c);
            },

            /**
             *
             */
            hide: function () {
                if (this.content) {
                    this.content.removeClass('active in').hide();
                }
                return this;
            },

            /**
             *
             */
            title: function(t){
                if(t){
                    this.elementTitle.html(t);
                }
                else{
                    return this.elementTitle.html();
                }
            },

            /**
             *
             */
            show: function () {
                var defer = $.Deferred();
                if (this.content) {
                    defer.resolve(this.content);
                }
                else if (this.attrs.url) {
                    $.get(this.attrs.url, function (r) {
                        this.content = $compile(this.wrapperContent(r))(this.scope);
                        defer.resolve(this.content);
                    }.bind(this));
                }
                return defer.promise().then(function (c) {
                    c.addClass('active in');
                    return c;
                });
            },

            /**
             *
             */
            getIndex: function () {
                return this.element.index();
            }
        };
        return function (scope, element, attrs, $content) {
            return new TabItem(scope, element, attrs, $content);
        };
    });