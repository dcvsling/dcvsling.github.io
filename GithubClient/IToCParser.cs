using System.Collections.Generic;
using System.Threading.Tasks;

using BMBlog.Services.Models;

namespace BMBlog.Services
{

    public interface IToCParser
    {
        Task<IEnumerable<SideNavItem>> Parse();
    }
}