namespace BMBlog.Services.Models
{

    public class TreeRoot
    {
        public string Sha { get; set; }
        public string Url { get; set; }
        public TreeNode[] Tree { get; set; }
        public bool Truncated { get; set; }
    }
}
