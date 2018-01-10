using Microsoft.EntityFrameworkCore;
using ReactReduxComponentManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactReduxComponentManagement.Data
{
    public class WebDbContext:DbContext
    {
        public WebDbContext(DbContextOptions<WebDbContext> options):base(options)
        {

        }
        public DbSet<PageCategory> Category { get; set; }
    }
}
