namespace BMBlog.Services.Models
{

    public class TreeNode
    {
        public string Path { get; set; }
        public string Mode { get; set; }
        public TypeEnum Type { get; set; }
        public string Sha { get; set; }
        public long? Size { get; set; }
        public string Url { get; set; }
    }
}
