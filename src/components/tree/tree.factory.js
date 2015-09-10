//-----------------------------------------------------------------------------------------------
//
//
//
//
//
//-----------------------------------------------------------------------------------------------
(function () {

    var requestMethod = 'post',
        idName = 'id',
        pidName = 'pid',
        labelName = 'name',
        defaultConfig = {
            check: {enable: true},
            edit: {enable: false},
            data: {
                key: {name: "name", childs: "childs", title: "name"},
                simpleData: {enable: true, idKey: "id", pIdKey: "pid", rootPId: "0"}
            }
        };

    angular.module('admin.component')
        .provider('UITreeControl', function () {
            let result = {

                setDataName(_idName, _labelName, _pidName) {
                    defaultConfig.data.simpleData.idKey = idName = _idName;
                    defaultConfig.data.simpleData.pIdKey = pidName = _pidName;
                    defaultConfig.data.key.name = labelName = _labelName;
                },

                setRequestMethod(_requestMethod) {
                    requestMethod = _requestMethod;
                },

                $get(AdminCDN, Ajax, $compile) {
                    class UITreeControl extends ComponentEvent {
                        constructor(scope, element, attrs, transclude) {
                            super();
                            this.element = element;
                            this.treeElement = element.find('ul');
                            this.scope = scope;
                            this.attrs = attrs;
                            this.treeNodeBtnMap = {};
                            this.dataMap = {};
                            this.transclude = transclude;
                            this.message = new Message('UITree');
                            this.init();
                            this.initEvents();
                        }

                        init() {
                            this.treeElement.attr('id', 'uiTree' + new Date().getTime());
                            this.callback = {
                                beforeClick: (treeId, treeNode, treeNodeId) => this.scope.onBeforeClick({treeNode: treeNode}),
                                onClick: (evt, treeId, treeNode, treeNodeId) => this.scope.onClick({treeNode: treeNode}),
                                beforeCheck: (treeId, treeNode) => this.scope.onBeforeCheck({treeNode: treeNode}),
                                onCheck: (evt, treeId, treeNode) => this.scope.onCheck({treeNode: treeNode})
                            };
                            this.view = {
                                addHoverDom: (treeId, treeNode) => this._onMouseEnterTreeNode(treeNode),
                                removeHoverDom: (treeId, treeNode) => this._onMouseOverTreeNode(treeNode)
                            };
                            this.check = {enabled: this.attrs.checked != 'false'};
                            this.triggerComplete(this.scope, this.attrs.ref || '$tree', this);
                        }

                        initEvents() {
                            this.scope.$watch('filter', (val) => {
                                if ($.fn.zTree) {
                                    clearTimeout(this.timeout);
                                    this.timeout = setTimeout(() => {
                                        this._filter(val);
                                    }, 100);
                                }
                            });
                            this.scope.onAddHandler = (evt) => this._onAddHandler($(evt.target).parent().data('treeNode'));
                            this.scope.onEditHandler = (evt) => this._onEditHandler($(evt.target).parent().data('treeNode'));
                            this.scope.onRemoveHandler = (evt) => this._onRemoveHandler($(evt.target).parent().data('treeNode'));
                        }

                        build() {
                            if ($.fn.ztree) {
                                this.load();
                            }
                            else {
                                Ajax.getScript(`${AdminCDN}/assets/js/zTree_v3/js/jquery.ztree.all-3.5.min.js`)
                                    .then(() => this.load());
                            }
                        }

                        load(params, url) {
                            url = url || this.attrs.url;
                            if (url) {
                                return Ajax[requestMethod](url, params || {})
                                    .then((r) => {
                                        this.scope.onDataSuccess({result: r});
                                        this.setData(r);
                                    })
                                    .catch((r) => {
                                        this.scope.onDataFail({result: r});
                                        this.setData(r);
                                    });
                            }
                            else if (this.dataList) {
                                this.setData(this.dataList);
                            }
                            else if (!this.attrs.manual) {
                                this.message.error('未设置url, 无法请求');
                            }
                            else {
                                this.setData([]);
                            }
                        }

                        setData(resData, isFilter) {
                            resData = resData || [];
                            if ($.fn.zTree) {
                                this.instance = $.fn.zTree.init(this.treeElement, $.extend({}, defaultConfig, this), resData);
                                this.expand();
                            }
                            if (!isFilter) {
                                this.dataList = resData;
                                this.setDataMap(resData);
                            }
                        }

                        setDataMap(resData) {
                            this.dataMap = {};
                            for (var item of resData) {
                                this.dataMap[item[idName]] = item;
                            }
                        }

                        expand(arg) {
                            arg = arg || this.attrs.expand;
                            if (arg == 'all') {
                                this.expandAll(true);
                            }
                            else if (arg) {
                            }
                        }

                        expandAll(isExpand) {
                            this.instance.expandAll(isExpand);
                        }

                        getHierarchyData(data) {
                            var r = [];
                            if (data) {
                                r.push(data);
                                while (data = this.getParentData(data)) {
                                    r.unshift(data);
                                }
                            }
                            return r;
                        }

                        getParentData(data) {
                            return this.dataMap[data[pidName]];
                        }

                        appendData(id, name, pid) {
                            let data = {};
                            data[idName] = id;
                            data[labelName] = name;
                            data[pidName] = pid;
                            if (pid != undefined && this.instance) {
                                let parent = this.instance.getNodeByParam(idName, pid, null);
                                this.instance.addNodes(parent, data);
                            }
                            else if (this.instance) {
                                this.instance.addNodes(null, data);
                            }
                            this.dataList = this.dataList || [];
                            this.dataList.push(data);
                            this.dataMap[id] = data;
                        }

                        clickItemById(id, isAll) {
                            if (this.instance) {
                                let node = this.instance.getNodeByParam(idName, id, null);
                                if (node) {
                                    this.instance.selectNode(node, isAll);
                                }
                            }
                        }

                        _filter(filterText) {
                            if (!this.dataList)
                                return;
                            let searchList = this.dataList, m = {};
                            if (filterText) {
                                filterText = filterText.toLowerCase();
                                searchList = [];
                                $.each(this.dataList, (dataIndex, data) => {
                                    if (data[labelName] && data[labelName].toLowerCase().indexOf(filterText) != -1) {
                                        searchList = searchList.concat(this.getHierarchyData(data));
                                    }
                                });
                                searchList = searchList.filter((item) => {
                                    if (!m[item[idName]]) {
                                        m[item[idName]] = 1;
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                });
                            }
                            this.setData(searchList, true);
                            this.expandAll(true);
                        }

                        _onMouseEnterTreeNode(treeNode) {
                            if (this.treeNodeBtnMap[treeNode.id]) {
                                this.treeNodeBtnMap[treeNode.id].show();
                            }
                            else {
                                let scope = this.scope.$new(),
                                    $dom = this.element.find('>span').clone(true);
                                scope.treeNode = treeNode;
                                this.transclude(scope, ($dom2) => {
                                    $dom.data('treeNode', treeNode);
                                    $dom.append($dom2).show();
                                    $("#" + treeNode.tId + "_span").append($dom);
                                    this.treeNodeBtnMap[treeNode.id] = $dom;
                                });
                            }
                        }

                        _onMouseOverTreeNode(treeNode) {
                            if (this.treeNodeBtnMap[treeNode.id]) {
                                this.treeNodeBtnMap[treeNode.id].hide();
                            }
                        }

                        _onAddHandler(treeNode) {
                            this.message.success('点击了新增');
                        }

                        _onEditHandler(treeNode) {
                            this.message.success('点击了新增');
                        }

                        _onRemoveHandler(treeNode) {
                            this.message.success('点击了删除');
                        }
                    }
                    return UITreeControl;
                }
            };
            return result;
        });
})();