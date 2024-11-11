using ShoppingCart.Common.Models;

namespace ShoppingCart.Api.ViewModels
{
    public class UserVM : Entity
    {
        public int UserId { get; set; }
        public int UserTypeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}