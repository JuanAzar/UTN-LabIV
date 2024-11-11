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
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;
        private readonly IJsonManager<ProductVM> _jsonManager;
        private readonly string _jsonFilePath = @"Data/Products.json";
        private IList<ProductVM> _productList;

        public ProductController(
            IConfiguration configuration,
            IMemoryCache memoryCache,
            IJsonManager<ProductVM> jsonManager)
        {
            _configuration = configuration;
            _memoryCache = memoryCache;
            _jsonManager = jsonManager;

            var cacheKey = $"{nameof(ProductController)}";

            _productList = _memoryCache.GetOrCreate(cacheKey, entry => {
                var duration = _configuration.GetChildren().Any(x => x.Key.Equals("MemoryCacheDurationInSeconds")) 
                    ? _configuration.GetValue<double>("MemoryCacheDurationInSeconds") 
                    : 300;

                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(duration);

                return _jsonManager.GetContent(_jsonFilePath) ?? new List<ProductVM>();
            });
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_productList
                        .OrderBy(x => x.ProductId));
        }

        [HttpGet]
        [Route("{productId}")]
        public IActionResult GetById(int productId)
        {
            return Ok(_productList
                .Where(x => x.ProductId == productId)
                .SingleOrDefault());
        }

        [HttpPost]
        [Route("")]
        public IActionResult Create(ProductVM product)
        {
            var productId = _productList.Select(x => x.ProductId)
                .OrderByDescending(x => x)
                .FirstOrDefault();

            product.ProductId = productId + 1;

            _productList.Add(product);

            return Ok();
        }

        [HttpPut]
        [Route("")]
        public IActionResult Edit(ProductVM product)
        {
            var aux = _productList
                    .Where(x => x.ProductId == product.ProductId)
                    .FirstOrDefault();

            if (aux == null)
                return NotFound("This Product does not exist");

            foreach (var p in _productList)
            {
                if(p.ProductId == product.ProductId)
                {
                    p.Name = product.Name;
                    p.ProductCategoryId = product.ProductCategoryId;
                    p.Description = product.Description;
                    p.Price = product.Price; 
                    break;                }
            }

            return Ok();
        }


        [HttpDelete]
        [Route("{productId}")]
        public IActionResult Delete(int productId)
        {
            var employee = _productList.Where(x => x.ProductId == productId)
                    .FirstOrDefault();

            _productList.Remove(employee);

            return Ok();
        }
    }
}