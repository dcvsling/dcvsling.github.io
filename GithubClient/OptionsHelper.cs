namespace BMBlog.Services
{
    public static class OptionsHelper
    {
        private const string GetHeadRef = @"https://api.github.com/repos/{account}/{repository}/git/refs/heads/master";
        private const string GetTree = @"https://api.github.com/repos/{account}/{repository}/git/trees/master?recursive=1";
        private const string GetBlob = @"https://api.github.com/repos/{account}/{repository}/git/blobs/{token}";
        private const string GetRaw = @"https://raw.githubusercontent.com/{account}/{repository}/{branch}";
        public static string ToGetTree(this MdBlockOptions options)
            => new LogValuesFormatter(GetTree).Format(options.ToArray());

        public static string ToHeaderRef(this MdBlockOptions options)
            => new LogValuesFormatter(GetHeadRef).Format(options.ToArray());

        public static string ToBlob(this MdBlockOptions options)
            => new LogValuesFormatter(GetBlob).Format(options.ToArray());

        public static string ToRawContent(this MdBlockOptions options)
            => new LogValuesFormatter(GetRaw).Format(options.ToArray());
    }
}
