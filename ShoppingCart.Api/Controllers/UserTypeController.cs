using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using ShoppingCart.Api.ViewModels;
using ShoppingCart.Common.Contracts;

namespace ShoppingCart.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTypeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;
        private readonly IJsonManager<UserTypeVM> _jsonManager;
        private readonly string _jsonFilePath = @"Data/UserTypes.json";
        private IList<UserTypeVM> _userTypeList;

        public UserTypeController(
            IConfiguration configuration,
            IMemoryCache memoryCache,
            IJsonManager<UserTypeVM> jsonManager)
        {
            _configuration = configuration;
            _memoryCache = memoryCache;
            _jsonManager = jsonManager;

            var cacheKey = $"{nameof(UserTypeController)}";

            _userTypeList = _memoryCache.GetOrCreate(cacheKey, entry => {
                var duration = _configuration.GetChildren().Any(x => x.Key.Equals("MemoryCacheDurationInSeconds")) 
                    ? _configuration.GetValue<double>("MemoryCacheDurationInSeconds") 
                    : 300;

                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(duration);

                return _jsonManager.GetContent(_jsonFilePath) ?? new List<UserTypeVM>();
            });
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_userTypeList);
        }

        [HttpGet]
        [Route("{userTypeId}")]
        public IActionResult GetById(int userTypeId)
        {
            return Ok(_userTypeList
                .Where(x => x.UserTypeId == userTypeId)
                .SingleOrDefault());
        }      
    }
}