using ReactReduxComponentManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactReduxComponentManagement.ViewModel
{
    public class CategoryReturnEditVM
    {
        public PageCategory Parent { get; set; }
        public List<PageCategory> Child { get; set; }
    }
}
