using BMBlog.Services.Models;

using Markdig;

using Microsoft.AspNetCore.Components;

using System;
using System.Threading.Tasks;

namespace BMBlog.Services
{
    internal class MdHtmlContentParser : IContentParser
    {
        private readonly GithubClient _client;
        private Action<RenderFragment> _observers = _ => { };
        public MdHtmlContentParser(GithubClient client)
        {
            _client = client;
        }
        private MarkdownPipeline Pipeline
            => new MarkdownPipelineBuilder()
                .UseAdvancedExtensions()
                .UseBootstrap()
                .UseYamlFrontMatter()
                .Build();

        public async Task Parse(SideNavItem nav)
        {
            var html = Markdown.ToHtml(await _client.GetRaw($"{(nav.Link.StartsWith("/") ? string.Empty : "/")}{nav.Link}.md"), Pipeline);
            _observers(builder => builder.AddMarkupContent(0, html));
            //_observers(docs.Blocks.ToList()
            //    .Select((x, i) => (RenderFragment)(builder => builder.AddMarkupContent(i, x.ToString())))
            //    .Aggregate((RenderFragment)(_ => { }), (l, r) => b => { l(b); r(b); }));
        }
        public IDisposable Subscribe(Action<RenderFragment> renderer)
        {
            _observers = renderer;
            return new ActionDisposable(() => _observers = _ => { });
        }
        
        private class ActionDisposable : IDisposable
        {
            private readonly Action _dispose;

            public ActionDisposable(Action dispose)
            {
                _dispose = dispose;
            }
            public void Dispose() => _dispose();
        }
    }
}
