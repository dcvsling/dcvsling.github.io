
using BMBlog.Services.Models;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BMBlog.Services
{
    internal class MdHtmlToCParser : IToCParser
    {
        private readonly MdBlockOptions _options;
        private readonly GithubClient _client;
        private readonly ILogger<MdHtmlToCParser> _logger;
        private readonly Regex _summaryPattern = new Regex(@"(?:( +)?-\s?(?:\[([^\]]+)\]\(([^\)\.]+)|([^\n]+))(\.\w+)?)", RegexOptions.Singleline);
        public MdHtmlToCParser(IOptions<MdBlockOptions> options, GithubClient client, ILogger<MdHtmlToCParser> logger)
        {
            _options = options.Value;
            _client = client;
            _logger = logger;
        }
        async public Task<IEnumerable<SideNavItem>> Parse()
        {
            try
            {
                var list = (await _client.GetSummary())
                    .Split(Environment.NewLine)
                    .SelectMany(str => {
                        return _summaryPattern.Matches(str)
                        .OfType<Match>()
                        .Select(x => {
                            x.Groups.Select((x, i) => $"group: { i }: {x}").ToList().ForEach(Console.WriteLine);
                            return new SideNavItem
                            {
                                Level = x.Groups[1].Value.Length,
                                Display = x.Groups[2].Value,
                                Link = x.Groups.Count > 3 ? x.Groups[3].Value : string.Empty,
                                Type = x.Groups.Count > 4 ? x.Groups[4].Value : string.Empty
                            };
                          }); 
                }).ToList();
                var min = list.Min(x => x.Level);
                list.ForEach(x => x.Level -= min);
                return list;
            }
            catch(AggregateException ex)
            {
                _logger.LogError(ex, ex.Message);
                return Enumerable.Empty<SideNavItem>();
            }
        }
    }
}



