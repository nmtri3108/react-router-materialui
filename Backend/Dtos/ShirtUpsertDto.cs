﻿using System.ComponentModel.DataAnnotations;

namespace BackEnd.Dtos
{
    public class ShirtUpsertDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public bool Sex { get; set; }
        [Required]
        public int Price { get; set; }
    }
}
