
using Microsoft.Extensions.DependencyInjection;

namespace BMBlog.Services
{

    public static class ServiceCollectionExtensions
    {

        public static IServiceCollection AddClientAndMD(this IServiceCollection services)
        {

            services.Configure<MdBlockOptions>(o =>
            {
                o.Account = "dcvsling";
                o.Branch = "master";
                o.Repository = "theory";
            })
            //.Configure<MarkdownPipelineBuilder>(builder => builder.UseAdvancedExtensions())
            .AddSingleton<IContentParser, MdHtmlContentParser>()
            .AddSingleton<IToCParser, MdHtmlToCParser>()
            .AddSingleton<GithubClient>();
            return services;
        }
    }
}
