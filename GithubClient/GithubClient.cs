using System.Net.Http.Json;
using System.Net.Http;
using System.Threading.Tasks;
using BMBlog.Services.Models;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

namespace BMBlog.Services
{
    public class GithubClient
    {
        private readonly HttpClient _client;
        private readonly ILogger<GithubClient> _logger;
        private readonly MdBlockOptions _options;

        public GithubClient(HttpClient client, IOptions<MdBlockOptions> options, ILogger<GithubClient> logger)
        {
            _client = client;
            _logger = logger;
            _options = options.Value;
        }

        public Task<TreeRoot> GetTree()
            => _client.GetFromJsonAsync<TreeRoot>(_options.ToGetTree());
        async public Task<string> GetRaw(string path)
        {
            var url = _options.ToRawContent() + path;
            //_logger.LogWarning("start http request, path: " + url);
            var result = await _client.GetStringAsync(url);
            //_logger.LogWarning("end http request, result: " + result);
            return result;
        }

        public Task<string> GetSummary()
            => GetRaw("/SUMMARY.md");
    }
}
