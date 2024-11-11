using ShoppingCart.Common.Models;

namespace ShoppingCart.Api.ViewModels
{
    public class UserTypeVM : Entity
    {
        public int UserTypeId { get; set; }
        public string Type { get; set; } = string.Empty;
    }
}