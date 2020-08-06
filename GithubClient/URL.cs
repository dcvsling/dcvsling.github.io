
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace BMBlog.Services
{
    public static class URL
    {
        private static readonly Regex _regex = new Regex(@"([^\/\?:]+)+");
        public static UrlInfo Parse(string url)
            =>_regex.Matches(url)
                .OfType<Match>()
                .Select((x, i) => GetSetter(x.Value, i))
                .Aggregate(
                    new UrlInfo(),
                    (info, setter) =>
                    {
                        setter(info);
                        return info;
                    });

        private static Action<UrlInfo> GetSetter(string text, int index)
            => (text, index) switch
            {
                (_, 0) => info => info.Protocal = text,
                (_, 1) => info => info.Domain = text,
                (var port, 2) when int.TryParse(port, out int p)  => info => info.Port = p,
                (string route, var i) when i > 2 && route.Contains("=") => info => SetQuery(info.Query, text),
                (_, _) => info => info.Routes.Add(text),
            };
        private static void SetQuery(Dictionary<string,string> query, string kvp)
        {
            var items = kvp.Split('=');
            query.Add(items[0], items[1]);
        }
    }
}
