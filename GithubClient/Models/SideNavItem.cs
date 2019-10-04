namespace BMBlog.Services.Models
{

    public class SideNavItem
    {
        public int Level { get; set; }
        public string Display { get; set; }
        public string Link { get; set; }
        public string Type { get; set; }
        public override string ToString() => $"Level: {Level}, Display: {Display}, Link: {Link}, Type: {Type}";
    }
}



