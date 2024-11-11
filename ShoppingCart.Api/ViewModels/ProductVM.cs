using ShoppingCart.Common.Models;

namespace ShoppingCart.Api.ViewModels
{
    public class ProductVM : Entity
    {
        public int ProductId { get; set; }
        public int ProductCategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
    }
}