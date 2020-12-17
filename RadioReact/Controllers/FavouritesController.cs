using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace RadioReact.Controllers
{
    public class FavRadioStation
    {
        public string RadioId { get; set; }
    }
    
    [ApiController]
    [Route("[controller]")]
    public class FavouritesController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            var favouriteRadioStationsText = System.IO.File.ReadAllText("favourite-radio-stations.json");
            return Ok(JsonSerializer.Deserialize<string[]>(favouriteRadioStationsText));
        }
        
        [HttpPost]
        public IActionResult Post([FromBody] FavRadioStation favRadio)
        {
            if (string.IsNullOrEmpty(favRadio.RadioId))
            {
                return BadRequest();
            }
            
            var favouriteRadioStationsText = System.IO.File.ReadAllText("favourite-radio-stations.json");
            var stations = string.IsNullOrEmpty(favouriteRadioStationsText) ? new string[0] : JsonSerializer.Deserialize<string[]>(favouriteRadioStationsText);

            if (stations.Contains(favRadio.RadioId))
            {
                return BadRequest("Station is already in favourites");
            }
            
            var newFavourites = stations.Append(favRadio.RadioId);
            var json = JsonSerializer.Serialize(newFavourites);
            System.IO.File.WriteAllText("favourite-radio-stations.json", json);
            
            return Ok(newFavourites);
        }
        
        [HttpDelete]
        public IActionResult Delete([FromBody] FavRadioStation favRadio)
        {
            var favouriteRadioStationsText = System.IO.File.ReadAllText("favourite-radio-stations.json");
            var stations = string.IsNullOrEmpty(favouriteRadioStationsText) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(favouriteRadioStationsText);

            if (!stations.Contains(favRadio.RadioId))
            {
                return BadRequest("Station is not in favourites");
            }
            
            stations.Remove(favRadio.RadioId);
            var json = JsonSerializer.Serialize(stations);
            System.IO.File.WriteAllText("favourite-radio-stations.json", json);
            
            return Ok(stations);
        }
    }
}