<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test2.aspx.cs" Inherits="PatrolSystem.pages.Test2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../extjs/resources/css/ext-all-neptune.css" rel="stylesheet" />
    <link href="../css/iconStyleSheet.css" rel="stylesheet" />
    <script src="../extjs/ext-all.js?<%=Server.UrlEncode(DateTime.Now.ToShortDateString()) %>" type="text/javascript"></script>
    <script src="../extjs/ext-lang-zh_CN.js?<%=Server.UrlEncode(DateTime.Now.ToShortDateString()) %>" type="text/javascript"></script>
    <script src="../js/webtools.js?<%=Server.UrlEncode(DateTime.Now.ToShortDateString()) %>" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="panel" style="margin: 5px;"></div>
    </form>
</body>
    <script type="text/javascript">
        Ext.namespace("PatrolSystem.pages.Test2");
        Ext.onReady(function () {
            var northPanel = Ext.create('Ext.panel.Panel', {
                id: 'mainPanel',
                title: '测试',
                width: 200,
                border: false,
                html: '<h1>管理系统2</h1>',
                heigth: 50,
                renderTo: 'panel'
            });

            loadTheme();
        });
    </script>
</html>
