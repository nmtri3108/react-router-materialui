using BackEnd.Data;
using BackEnd.Models;
using BackEnd.Services.IServices;

namespace BackEnd.Services
{
    public class ShirtService : IShirtService
    {
        private readonly ApplicationDbContext _db;

        public ShirtService(ApplicationDbContext db)
        {
            _db = db;
        }
        public Shirt Create(Shirt input)
        {
            try
            {
                _db.Shirts.Add(input);
                _db.SaveChanges();
                return input;
            }catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                var shirt = _db.Shirts.FirstOrDefault(x => x.Id == id);
                if (shirt == null)
                    return false;

                _db.Shirts.Remove(shirt);
                _db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public IList<Shirt> GetAll()
        {
            return _db.Shirts.ToList();
        }

        public Shirt GetById(int id)
        {
            try
            {
                var shirt = _db.Shirts.FirstOrDefault(x => x.Id == id);
                if (shirt == null)
                    throw new NullReferenceException();
                return shirt;
            }catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public Shirt Update(Shirt input)
        {
            try
            {
                _db.Shirts.Update(input);
                _db.SaveChanges();
                return input;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
