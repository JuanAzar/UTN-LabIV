using ShoppingCart.Common.Models;

namespace ShoppingCart.Common.Contracts
{
    public interface IJsonManager<T> where T : Entity
    {
        IList<T> GetContent(string filePath);
    }
}