Ext.define('KitchenSink.store.Tree', {
    extend: 'Ext.data.TreeStore',
    fields: [
             { name: 'id', type: 'string', defaultValue: null },
             { name: 'text', type: 'string', defaultValue: null },
             { name: 'parentId', type: 'string', defaultValue: null },
             { name: 'index', type: 'int', defaultValue: null },
             { name: 'depth', type: 'int', defaultValue: 0 },
             { name: 'expanded', type: 'bool', defaultValue: false },
             { name: 'expandable', type: 'bool', defaultValue: true },
             { name: 'checked', type: 'auto', defaultValue: null },
             { name: 'leaf', type: 'bool', defaultValue: false },
             { name: 'cls', type: 'string', defaultValue: null },
             { name: 'iconCls', type: 'string', defaultValue: null },
             { name: 'icon', type: 'string', defaultValue: null },
             { name: 'root', type: 'boolean', defaultValue: false },
             { name: 'isLast', type: 'boolean', defaultValue: false },
             { name: 'isFirst', type: 'boolean', defaultValue: false },
             { name: 'allowDrop', type: 'boolean', defaultValue: true },
             { name: 'allowDrag', type: 'boolean', defaultValue: true },
             { name: 'loaded', type: 'boolean', defaultValue: false },
             { name: 'loading', type: 'boolean', defaultValue: false },
             { name: 'href', type: 'string', defaultValue: null },
             { name: 'hrefTarget', type: 'string', defaultValue: null },
             { name: 'qtip', type: 'string', defaultValue: null },
             { name: 'qtitle', type: 'string', defaultValue: null },
             { name: 'url', type: 'string', defaultValue: null }                 //自定义
    ],
    proxy: {
        type: 'ajax',
        url: 'data/tree.json'
    },
    sorters: [{
        property: 'leaf',
        direction: 'ASC'
    }, {
        property: 'text',
        direction: 'ASC'
    }]
});

Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();

    var systemName = 'PatrolSystem';

    var mainPanel = new Ext.create("Ext.tab.Panel", {
        region: 'center',
        id: 'mainPanel',
        frameHeader: false,
        items: [{
            title: '主 页',
            border: false,
            activeTab: 1,
            html: '主页测试'
        }]
    });

    var store = Ext.create('KitchenSink.store.Tree', {
        root: {
            expanded: true,
            children: [{
                text: "XXX系统", id: 'P0000', expanded: true, iconCls: 'mainIcon', children: [{
                    text: "功能-1", id: 'P0010', expanded: true, children: [{
                        text: "功能-1-1", id: 'P0011', iconCls: 'test1', leaf: true, url: '/pages/Test1.aspx'
                    }, {
                        text: "功能-1-2", id: 'P0012', iconCls: 'test2', leaf: true, url: '/pages/Test2.aspx'
                    }]
                }, {
                    text: "功能-2", id: 'P0020', children: [{
                        text: "功能-2-1", id: 'P0021', leaf: true, url: '/pages/TestOthers.aspx'
                    }, {
                        text: "功能-2-2", id: 'P0022', leaf: true, url: '/pages/TestOthers.aspx'
                    }, {
                        text: "功能-2-3", id: 'P0023', leaf: true, url: '/pages/TestOthers.aspx'
                    }]
                }, {
                    text: "功能-3", id: 'P0030', children: [{
                        text: "功能-3-1", id: 'P0031', leaf: true, url: '/pages/TestOthers.aspx'
                    }, {
                        text: "功能-3-2", id: 'P0032', leaf: true, url: '/pages/TestOthers.aspx'
                    }, {
                        text: "功能-3-3", id: 'P0033', leaf: true, url: '/pages/TestOthers.aspx'
                    }]
                }]
            }]
        }
    });

    var treePanel = Ext.create('Ext.tree.Panel', {
        frameHeader: false,
        store: store,
        rootVisible: false,
        listeners: {
            itemclick: function (view, record, item, index, e, eOpts) {
                if (record.get('leaf')) { //如果为最深的子节点
                    var id = record.get('id');
                    var title = record.get('text');
                    var iconCls = record.get('iconCls') || '';
                    var tab = Ext.getCmp('mainPanel');
                    if (Ext.getCmp(id)) {
                        tab.setActiveTab(id);
                    } else {
                        var fullUrls = 'http://' + location.host + ((location.port != '') ? (':' + location.port) : '') + '/' + systemName + record.get('url');
                        tab.add({
                            id: id,
                            title: title,
                            iconCls: iconCls,
                            closable: true,
                            html: '<iframe id = "iframepage' + id + '" src="' + fullUrls + '" frameBorder=0 scrolling=no width="100%" height="100%" onLoad="iFrameHeight(' + id + ')" />'
                        });
                        tab.setActiveTab(id);
                    }
                }
            }
        }
    });

    var viewport = Ext.create('Ext.Viewport', {
        id: 'viewport',
        layout: {
            type: 'border',
            padding: 2
        },
        defaults: {
            split: true,
            border: true
        },
        renderTo: 'panel',
        items: [{
            region: 'north',
            autoWidth: true,
            split: false,
            height: 165,
            bbar: [
                { xtype: 'tbtext', text: '<div style="width:760px"><marquee scrolldelay="300" direction="left" onmouseover="this.stop()" onmouseout="this.start()"><span style="color:red">测试！</span></marquee></div>' },
                { xtype: "tbfill" }, // 填充标注
                // ,'-', // 分隔符
                // {
                // text: '修改密码',
                // iconCls: 'change_password',
                // handler: function () {
                //     changePasswordWindow.show();
                // }
                // },
                {
                    id: 'themeSelect',
                    hiddenName: 'comboId',
                    xtype: 'combo',
                    fieldLabel: '皮肤选择',
                    width: 180,
                    labelWidth: 60,
                    triggerAction: 'all',
                    store: new Ext.data.SimpleStore({
                        fields: ['value', 'text'],
                        data: [
                            ['default', '默认风格'],
                            ['classical', '经典风格（蓝）'],
                            ['gray', '经典风格（灰）'],
                            ['access', '高亮风格']
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    mode: 'local',
                    emptyText: '切换皮肤'
                },
                '-', // 分隔符
                { xtype: 'tbtext', text: '您好！管理员' },
                '-', // 分隔符
                {
                    text: '退出',
                    iconCls: 'logout',
                    handler: function () {
                        Ext.MessageBox.confirm("提示", "您确定要退出吗？", function (btn) {
                            if (btn == "yes") {
                                alert('已关闭！');
                            } else {
                                alert('取消关闭！');
                            }
                        });  // end MessageBox
                    } // end handler
                }
            ],
            html: '<img src="../images/top.png" style="width:100%;height:100%">'
        }, {
            region: 'west',
            title: '系统功能菜单',
            xtype: 'panel',
            iconCls: 'system',
            collapsible: true,
            width: 300,
            minWidth: 250,
            maxWidth: 350,
            layout: 'fit',
            items: treePanel // html: "树结构"
        }, mainPanel]
    }); // end viewport

    Ext.getCmp('themeSelect').on('select', function (combo) {
        var comboxStyle = combo.getValue();
        if (comboxStyle && comboxStyle == 'classical') {
            Ext.util.CSS.swapStyleSheet('theme', '../extjs/resources/css/ext-all.css');
        } else {
            Ext.util.CSS.swapStyleSheet('theme', '../extjs/resources/css/ext-all-' + comboxStyle + '.css');
        }
        Ext.getCmp('viewport').doLayout();
        // 将当前皮肤记入cookie
        var cp = new Ext.state.CookieProvider();
        Ext.state.Manager.setProvider(cp);
        cp.set("themes", comboxStyle);
        // 每个子项都重新换肤
        var contentDocument = document.getElementsByTagName("iframe");
        var docLength = contentDocument.length;
        for (var i = 0; i < docLength; i++) {
            var tempCD = contentDocument[i].contentWindow;
            tempCD.loadTheme();
        }
    });

    // 加载界面时加载样式
    loadTheme();
    Ext.getCmp('viewport').doLayout();

});