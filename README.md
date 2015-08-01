

# Angular Admin UI
* src
    * component  all the control
    * filter     common filter
    * service    common service
    * template   custom control template
    * admin.js   entry file

## configuration
```javascript
.config((AjaxProvider, MessageProvider) => {
    //
    // ajax 默认返回处理
    //
    AjaxProvider.setSuccessHandler((result) => result.type == 1 ? result.data : null);
    AjaxProvider.setFailHandler((result) => result.type != 1 ? result.data : null);

    //
    // 通知位置
    //
    MessageProvider.setPostion('bottom', 'right');
});
```

## 控制

* ```<ui-state-button class="btn-danger" ng-click="" target="">点击</ui-state-button>```
    * ngClick 是controller里面的方法, 可以返回pormise方法
    * target 如果设置, 点击会锁屏幕, css3表达式

## 图表

## 容器

## 表单

## 查询

## 表格

## 树

## 弹出框

## component list
![Image text](https://raw.githubusercontent.com/binlaniua/AngularAdmin/master/demo/docs/components.jpg)
    
## template list
![Image text](https://raw.githubusercontent.com/binlaniua/AngularAdmin/master/demo/docs/template.jpg)

## service list
![Image text](https://raw.githubusercontent.com/binlaniua/AngularAdmin/master/demo/docs/service.jpg)

## Form UI
![Image text](https://raw.githubusercontent.com/binlaniua/AngularAdmin/master/demo/docs/form.png)
```javascript
<ui-form column="1">
    <ui-form-input label="normal" placeholder="abc" help="help" model="ccc" ></ui-form-input>
    <ui-form-date label="date" placeholder="abc" help="help" model="aaa"></ui-form-date>
    <ui-form-select label="select">
        <option value="a">aa</option>
        <option value="a">aa</option>
    </ui-form-select>
    <ui-form-switch label="switch" name="qqq" on-value="1" off-value="2" on-text="123" off-text="321"></ui-form-switch>
    <ui-form-region  label="region"></ui-form-region>
    <ui-form-user-select label="user"></ui-form-user-select>
    <ui-form-textarea label="&lt;span style='color:red'&gt;*&lt;/span&gt; textarea："></ui-form-textarea>
</ui-form>
```

## SearchForm
![Image text](https://raw.githubusercontent.com/binlaniua/AngularAdmin/master/demo/docs/searchform.png)
```javascript
<ui-search-form>
    <ui-search-input class="input-medium" label="测试" name="test"></ui-search-input>
    <ui-search-select name="test2">
        <option value="aaa">创建人</option>
        <option value="bbbb">沟通人</option>
    </ui-search-select>
    <ui-search-input-select>
        <option value="aaa">联系方式</option>
        <option value="bbbb">客户姓名</option>
    </ui-search-input-select>
    <ui-search-multi-select tip="xxxxx">
        <option value="aaa">联系方式</option>
        <option value="bbbb">客户姓名</option>
        <option value="ccc">联系方式</option>
        <option value="ddd">客户姓名</option>
    </ui-search-multi-select>
    <ui-search-date class="input-medium" label="日期" name="test3"></ui-search-date>
    <ui-search-region mode="c" label="区域" name="asdasd22"></ui-search-region>
    <ui-search-user-select class="input-medium" label="用户"></ui-search-user-select>
    <ui-search-date-range label="注册时间"></ui-search-date-range>
</ui-search-form>
```

## Toolbar And Table
![Image text](https://raw.githubusercontent.com/binlaniua/AngularAdmin/master/demo/docs/toolbar_table.png)
```javascript
<ui-table url="/test" edit-url="/test">
    <ui-table-check-column name="a"></ui-table-check-column>
    <ui-table-column head="checkbox" name="a" editable="region"></ui-table-column>
    <ui-table-progress-column head="progress" name="a"></ui-table-progress-column>
    <ui-table-image-column head="image" name="ww"></ui-table-image-column>
    <ui-table-date-column head="date" name="e" ></ui-table-date-column>
    <ui-table-state-column hred="state" name="f" default="0" >
        <span class='label label-sm label-default' state="0" style='background-color:red !important'>0</span>
        <span class='label label-sm label-default' state="1" style='background-color:green !important'>1</span>
    </ui-table-state-column>
    <ui-table-operation-column head="opertion">
        <a class="btn btn-sm default" href="javascript:;" ng-click="managePotential()"><iclass="fa fa-cogs"></i></a>
        <a class="btn btn-sm default" href="javascript:;" ng-click="assignPotential()"><i class="fa fa-hand-o-right"></i></a>
        <a class="btn btn-sm default" href="javascript:;" ng-click="editContact()"><i class="fa fa-comments-o"></i></a>
        <a class="btn btn-sm default" href="javascript:;" ng-click="assignClaim()"><i class=" fa fa-chain"></i></a>
        <a class="btn btn-sm default " href="javascript:;" ng-click="assignRelease()"><i class=" fa fa-chain-broken"></i></a>
    </ui-table-operation-column>
</ui-table>
```

## Tree
![Image text](https://raw.githubusercontent.com/binlaniua/AngularAdmin/master/demo/docs/tree.png)
```javascript
<ui-tree url="/region" expand="1" on-click="treeTwoClick"></ui-tree>
```