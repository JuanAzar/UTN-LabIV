
﻿using Microsoft.AspNetCore.Mvc;
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
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;
        private readonly IJsonManager<UserVM> _jsonManager;
        private readonly string _jsonFilePath = @"Data/Users.json";
        private IList<UserVM> _userList;

        public UserController(
            IConfiguration configuration,
            IMemoryCache memoryCache,
            IJsonManager<UserVM> jsonManager)
        {
            _configuration = configuration;
            _memoryCache = memoryCache;
            _jsonManager = jsonManager;

            var cacheKey = $"{nameof(UserController)}";

            _userList = _memoryCache.GetOrCreate(cacheKey, entry => {
                var duration = _configuration.GetChildren().Any(x => x.Key.Equals("MemoryCacheDurationInSeconds")) 
                    ? _configuration.GetValue<double>("MemoryCacheDurationInSeconds") 
                    : 300;

                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(duration);

                return _jsonManager.GetContent(_jsonFilePath) ?? new List<UserVM>();
            });
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAll()
        {
            return Ok(_userList);
        }

        [HttpPost]
        [Route("Login")] 
        public IActionResult Login(LoginCredentialsVM loginCredentials)
        {
            var user = _userList
                .Where(x => x.Email == loginCredentials.Email)
                .FirstOrDefault();

            if ((user == null) || (user.Password != loginCredentials.Password))
                return Unauthorized();

            return Ok(user);
        }
    }
}
