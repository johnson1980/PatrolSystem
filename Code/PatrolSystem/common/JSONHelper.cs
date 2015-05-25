using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using PatrolSystem.Properties;
using System.Text;
using System.Collections;
using System.ComponentModel;

namespace PatrolSystem.common
{
    public static class JSONHelper
    {
        public static StringBuilder result = new StringBuilder();
        public static StringBuilder sb = new StringBuilder();
        private static ArrayList rowNameArrayList = new ArrayList();

        public static string DT2JSON_Combox(DataTable dt)
        {
            string ComboxJSONData = JsonConvert.SerializeObject(dt, new DataTableConverter());
            return String.Format(Resources.JSONString_Combox, ComboxJSONData);
        }

        public static string DT2JSON_GridPanel(DataTable dt)
        {
            string JSONString = Resources.JSONString_GridPanelNull;
            int RowCount = dt.Rows.Count;
            if (RowCount == 0)
                return JSONString;
            string JSONDataString = JsonConvert.SerializeObject(dt, new DataTableConverter());
            JSONString = String.Format(Resources.JSONString_GridPanel, RowCount, JSONDataString);
            return JSONString;
        }

        /// <summary>
        /// 根据DataTable生成Json树结构
        /// </summary>
        /// <param name="tabel">数据源</param>
        /// <param name="idCol">ID列</param>
        /// <param name="rela">关系字段(字典表中的树结构字段)</param>
        /// <param name="pId">父ID(0)</param>
        public static string DT2JSON_TreeGrid(DataTable dt, string idCol, string rela, object pId) {
            string JSONString = "";
            int count = dt.Columns.Count;
            if (count == 0)
                return Resources.JSONString_GridPanelNull;
            for (int i = 0; i < count; i++)
            {
                // NewtonJson转换的都为大写，这里也转为大写
                string tempColName = dt.Columns[i].ColumnName.ToUpper();
                if (!idCol.ToUpper().Equals(tempColName))
                    rowNameArrayList.Add(tempColName);
            }
            // 递归得到树结构数据
            ConvertTreeGrid2JSON(dt, idCol, rela, pId);

            JSONString = String.Format(Resources.JSONString_TreeGridPanel, Guid.NewGuid(), result.ToString());
            result.Clear();
            rowNameArrayList = new ArrayList();

            return JSONString;
        }

        public static DataTable JSON2DataTable<T>(this IList<T> data)
        {
            PropertyDescriptorCollection props = TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            for (int i = 0; i < props.Count; i++)
            {
                PropertyDescriptor prop = props[i];
                table.Columns.Add(prop.Name, prop.PropertyType);
            }
            object[] values = new object[props.Count];
            foreach (T item in data)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    values[i] = props[i].GetValue(item);
                }
                table.Rows.Add(values);
            }
            return table; 
        }

        private static void ConvertTreeGrid2JSON(DataTable dt, string idCol, string rela, object pId)
        {
            // NewtonJson转换的都为大写，这里也转为大写
            idCol = idCol.ToUpper();
            result.Append(sb.ToString());
            sb.Clear();
            if (dt.Rows.Count > 0)
            {
                sb.Append("[");
                string filer = String.Format("{0}='{1}'", rela, pId);
                DataRow[] rows = dt.Select(filer);
                if (rows.Length > 0)
                {
                    foreach (DataRow row in rows)
                    {
                        sb.Append("{\"" + idCol + "\":\"" + row[idCol]);
                        for (int i = 0; i < rowNameArrayList.Count; i++)
                        {
                            string txtCol = rowNameArrayList[i].ToString();
                            sb.Append("\",\"" + txtCol + "\":\"" + row[txtCol]);
                        }
                        if (dt.Select(string.Format("{0}='{1}'", rela, row[idCol])).Length > 0)
                        {
                            sb.Append("\",\"children\":");
                            ConvertTreeGrid2JSON(dt, idCol, rela, row[idCol]);
                            result.Append(sb.ToString());
                            sb.Clear();
                        }
                        else
                        {
                            sb.Append("\",\"leaf\": true");
                            result.Append(sb.ToString());
                            sb.Clear();
                        }
                        result.Append(sb.ToString());
                        sb.Clear();
                        sb.Append("},");
                    }
                    sb = sb.Remove(sb.Length - 1, 1);
                }
                sb.Append("]");
                result.Append(sb.ToString());
                sb.Clear();
            }
        }

    }
}