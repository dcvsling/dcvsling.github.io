namespace BMBlog.Services
{
    public class MdBlockOptions
    {
        public string Account { get; set; }
        public string Repository { get; set; }
        public string Branch { get; set; }
        public string[] ToArray()
            => new[] { Account, Repository, Branch };
    }
}
