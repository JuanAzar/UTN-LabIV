using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using ShoppingCart.Api.ViewModels;
using ShoppingCart.Common;
using ShoppingCart.Common.Contracts;

namespace ShoppingCart.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;
        private readonly IJsonManager<ProductCategoryVM> _jsonManager;
        private readonly string _jsonFilePath = @"Data/ProductCategories.json";
        private IList<ProductCategoryVM> _productCategoryList;

        public ProductCategoryController(
            IConfiguration configuration,
            IMemoryCache memoryCache,
            IJsonManager<ProductCategoryVM> jsonManager)
        {
            _configuration = configuration;
            _memoryCache = memoryCache;
            _jsonManager = jsonManager;

            var cacheKey = $"{nameof(ProductCategoryController)}";

            _productCategoryList = _memoryCache.GetOrCreate(cacheKey, entry => {
                var duration = _configuration.GetChildren().Any(x => x.Key.Equals("MemoryCacheDurationInSeconds")) 
                    ? _configuration.GetValue<double>("MemoryCacheDurationInSeconds") 
                    : 300;

                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(duration);

                return _jsonManager.GetContent(_jsonFilePath) ?? new List<ProductCategoryVM>();
            });
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_productCategoryList);
        }

        [HttpGet]
        [Route("{productCategoryId}")]
        public IActionResult GetById(int productCategoryId)
        {
            return Ok(_productCategoryList
                .Where(x => x.ProductCategoryId == productCategoryId)
                .SingleOrDefault());
        }

        [HttpPost]
        [Route("")]
        public IActionResult Create(ProductCategoryVM productCategory)
        {
            var productCategoryId = _productCategoryList.Select(x => x.ProductCategoryId)
                .OrderByDescending(x => x)
                .FirstOrDefault();

            productCategory.ProductCategoryId = productCategoryId + 1;

            _productCategoryList.Add(productCategory);

            return Ok();
        }

        [HttpPut]
        [Route("")]
        public IActionResult Edit(ProductCategoryVM productCategory)
        {
            var aux = _productCategoryList
                    .Where(x => x.ProductCategoryId == productCategory.ProductCategoryId)
                    .FirstOrDefault();

            if (aux == null)
                return NotFound("This Product Category does not exist");

            foreach (var p in _productCategoryList)
            {
                if (p.ProductCategoryId == productCategory.ProductCategoryId)
                {
                    p.Description = productCategory.Description;
                    break;
                }
            }

            return Ok();
        }
    }
}