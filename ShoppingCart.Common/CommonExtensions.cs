using Microsoft.Extensions.DependencyInjection;
using ShoppingCart.Common.Implementations;
using ShoppingCart.Common.Contracts;

namespace ShoppingCart.Common
{
    public static class CommonExtensions
    {
        public static IServiceCollection ConfigureServices(IServiceCollection services)
        {
            return services.AddScoped(typeof(IJsonManager<>), typeof(JsonManager<>));
        }        
    }
}