using AutoMapper;
using BackEnd.Attributes;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ShirtsController : ControllerBase
    {
        private IShirtService _shirtService;
        private readonly IMapper _mapper;

        public ShirtsController(IShirtService shirtService, IMapper mapper)
        {
            _shirtService = shirtService;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public IList<Shirt> GetAll()
        {
            return _shirtService.GetAll();
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById([FromRoute]int id)
        {
            var shirt = _shirtService.GetById(id);
            return Ok(shirt);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var result = _shirtService.Delete(id);
            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult Create(ShirtUpsertDto input)
        {
            var shirt = _mapper.Map<Shirt>(input);
            _shirtService.Create(shirt);
            return Ok(shirt);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update([FromRoute] int id, ShirtUpsertDto input)
        {
            var shirt = _shirtService.GetById(id);
            _mapper.Map(input, shirt);
            _shirtService.Update(shirt);
            return Ok(shirt);
        }
    }
}
