using BMBlog.Services.Models;

using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BMBlog.Services
{
    public interface IContentParser
    {
        Task Parse(SideNavItem nav);
        IDisposable Subscribe(Action<RenderFragment> renderer);
    }
}