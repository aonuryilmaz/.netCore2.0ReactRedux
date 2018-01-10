using Microsoft.AspNetCore.Mvc;
using ReactReduxComponentManagement.Data;
using ReactReduxComponentManagement.Models;
using ReactReduxComponentManagement.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactReduxComponentManagement.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController:Controller
    {
        private readonly WebDbContext _context;
        public CategoryController(WebDbContext context)
        {
            _context = context;
        }
        [HttpGet("[action]")]
        public IActionResult PageCategories()
        {
            var list = _context.Category.Where(w=>w.ParentId==0).ToList();
            return Json(list);
        }
        [HttpPost("[action]")]
        public IActionResult AddCategory([FromBody] CategoryAddViewModel model)
        {
            if (!String.IsNullOrEmpty(model.Description) && !String.IsNullOrEmpty(model.Title))
            {
                PageCategory category = new PageCategory();
                category.Title = model.Title;
                category.Description = model.Description;
                _context.Category.Add(category);
                _context.SaveChanges();
                return Json("ok");
            }
            return Json(model);

        }
        [HttpGet("[action]")]
        public IActionResult EditCategory(int id)
        {
            var child = _context.Category.Where(w => w.ParentId == id).ToList();
            var parent = _context.Category.FirstOrDefault(f => f.PageCategoryId == id);
            if (parent != null)
            {
                CategoryReturnEditVM res = new CategoryReturnEditVM();
                res.Parent = parent;
                res.Child = child;
                return Json(res);
            }
            return Json("");
        }
        [HttpPost("[action]")]
        public IActionResult EditCategory([FromBody]PageCategory model) {
            var category = _context.Category.FirstOrDefault(f => f.PageCategoryId == model.PageCategoryId);
            if (category != null) {
                _context.Entry(category).CurrentValues.SetValues(model);
                _context.SaveChanges();
                return Json("ok");
            }
            return Json(model);
        }
    }
}
