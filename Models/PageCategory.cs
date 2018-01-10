using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactReduxComponentManagement.Models
{
    public class PageCategory
    {
        public int PageCategoryId { get; set; }
        public string Title { get; set; }
        public int ParentId { get; set; }
        public string Keywords { get; set; }
        public string Description { get; set; }
        public string Subtitle { get; set; }
        public string PageHtml { get; set; }
        public Boolean isCategory { get; set; }
    }
}
