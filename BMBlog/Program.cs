using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using BMBlog.Services;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System;
using System.Linq;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.Extensions.Configuration;

namespace BMBlog
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");
            builder
                .Services
                .AddLogging(b => b.SetMinimumLevel(LogLevel.Trace))
                .AddSingleton(new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) })
                .AddClientAndMD();

            await builder.Build().RunAsync();
        }
    }
}
