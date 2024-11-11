using ShoppingCart.Common.Models;

namespace ShoppingCart.Api.ViewModels
{
    public class ProductCategoryVM : Entity
    {
        public int ProductCategoryId { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}