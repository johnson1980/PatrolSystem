function loadTheme() {
    if (Ext) {
        // 加载界面样式
        var cp = new Ext.state.CookieProvider();
        Ext.state.Manager.setProvider(cp);
        var comboxStyle = cp.get("themes");
        if (comboxStyle && comboxStyle == 'classical') {
            Ext.util.CSS.swapStyleSheet('theme', '../extjs/resources/css/ext-all.css');
        } else {
            Ext.util.CSS.swapStyleSheet('theme', '../extjs/resources/css/ext-all-' + comboxStyle + '.css');
        }
    }
}