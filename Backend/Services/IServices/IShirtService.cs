using BackEnd.Models;

namespace BackEnd.Services.IServices
{
    public interface IShirtService
    {
        IList<Shirt> GetAll();
        Shirt GetById(int id);
        bool Delete(int id);
        Shirt Create(Shirt input);
        Shirt Update(Shirt input);
    }
}
