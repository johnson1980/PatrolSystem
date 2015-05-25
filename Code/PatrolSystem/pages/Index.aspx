<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="PatrolSystem.pages.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="../extjs/resources/css/ext-all-neptune.css" rel="stylesheet" />
    <link href="../css/iconStyleSheet.css" rel="stylesheet" />
    <script src="../extjs/ext-all.js?<%=Server.UrlEncode(DateTime.Now.ToShortDateString()) %>" type="text/javascript"></script>
    <script src="../extjs/ext-lang-zh_CN.js?<%=Server.UrlEncode(DateTime.Now.ToShortDateString()) %>" type="text/javascript"></script>
    <script src="../js/webtools.js?<%=Server.UrlEncode(DateTime.Now.ToShortDateString()) %>" type="text/javascript"></script>
    <title>主页测试</title>
    <script type="text/javascript">
        function iFrameHeight( pid ) {
            var ifm = document.getElementById("iframepage" + pid.id);
            var subWeb = document.getElementById(pid.id + "-innerCt");
            if (ifm != null && subWeb != null) {
                ifm.height = subWeb.offsetHeight;
            }
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="panel"></div>
    </form>
</body>
    <script src="../js/Index.js?<%=Server.UrlEncode(DateTime.Now.ToShortDateString()) %>" type="text/javascript"></script>
</html>
