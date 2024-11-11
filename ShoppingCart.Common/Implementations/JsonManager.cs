using Newtonsoft.Json;
using ShoppingCart.Common.Contracts;
using ShoppingCart.Common.Models;

namespace ShoppingCart.Common.Implementations
{
    public class JsonManager<T> : IJsonManager<T> where T : Entity
    {
        public IList<T> GetContent(string filePath)
        {
            var jsonContent = System.IO.File.ReadAllText(filePath);

            return JsonConvert.DeserializeObject<IList<T>>(jsonContent)!;
        }
    }
}