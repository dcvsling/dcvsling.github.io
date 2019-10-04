using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Options;
using Microsoft.Toolkit.Parsers.Markdown;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace BMBlog.Services
{
    public class UrlInfo
    {
        public string Protocal { get; set; } = string.Empty;
        public string Host => $"{Domain}:{Port}";
        public string Domain { get; set; } = string.Empty;
        public int Port { get; set; } = 443;
        public string Path => "/" + string.Join("/", Routes.DefaultIfEmpty("README").Select(WebUtility.UrlEncode));
        public List<string> Routes { get; } = new List<string>();
        public string QueryString => string.Join("&", Query.Select(x => $"{WebUtility.UrlEncode(x.Key)}={WebUtility.UrlEncode(x.Value)}"));
        public Dictionary<string, string> Query { get; } = new Dictionary<string, string>();
        public override string ToString()
            => System.Text.Json.JsonSerializer.Serialize(this);
    }
}
