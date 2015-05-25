using PatrolSystem.common;
using PatrolSystem.Properties;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace PatrolSystem.manage
{
    /// <summary>
    /// 后台数据及逻辑处理
    /// </summary>
    public class PatrolSystem : IHttpHandler
    {
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        private readonly DBHelper dbHelper = new DBHelper();

        #region Properties
        public static HttpContext CurHttpContext
        {
            get { return HttpContext.Current; }
        }
        #endregion

        public void ProcessRequest(HttpContext context)
        {
            if (!string.IsNullOrEmpty(context.Request.Form["action"]))
            {
                context.Response.ContentType = "text/plain";
                string ajaxMethod = context.Request["action"];
                switch (ajaxMethod)
                {
                    case "Test":
                        Test();
                        break;
                    default:
                        context.Response.Write("can't find this action method!");
                        context.Response.End();
                        break;
                }
            }
        }


        #region just a test
        private void Test()
        {
            string output = "";
            try
            {
                string cs = CurHttpContext.Request.Form["cs"];

                string sqlStr = "select * from table";
                DataTable dt = dbHelper.ExecuteQuery(sqlStr);
                output = JSONHelper.DT2JSON_GridPanel(dt);
            }
            catch (Exception ex)
            {
                LogFile.WriteLine("错误:" + ex.Message);
                output = String.Format(Resources.JSONString_Error, "错误！");
            }
            CurHttpContext.Response.Write(output);
        }
        #endregion
    }
}