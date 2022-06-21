(function () {

    var Tab = function () {
        this._$tabItem = $('.tab-item').find('.tab-item-title');
        this._$tabPanel = $('.tab-panel').find('.tab-panel-content');
        this._selectIndex = 0;
        return this.init();
    }
    Tab.prototype = {
        changeTab: function (index) {
            this._$tabItem.removeClass('active');
            this._$tabPanel.removeClass('active')
            this._$tabItem.eq(index).addClass('active');
            this._$tabPanel.eq(index).addClass('active')
        },
        selectedIndex() {
            return this._selectIndex;
        },
        init: function () {
            var _this = this;
            this._$tabItem.click(function () {
                _this.changeTab($(this).index());
                _this._selectIndex = $(this).index();
            });
            return _this;
        }
    }
    var tab = new Tab();
})()
