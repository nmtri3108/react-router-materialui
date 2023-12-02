using AutoMapper;
using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<ShirtUpsertDto, Shirt>().ReverseMap();
            });
            return mappingConfig;
        }

    }
}
