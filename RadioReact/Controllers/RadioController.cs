using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace RadioReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RadioController : ControllerBase
    {
        private static Process _mPlayer;
        private static RadioStation CurrentStation { get; set; }
        private RadioStation[] RadioStations { get; }
        private readonly IConfiguration _config;
        private readonly ILogger<RadioController> _logger;

        public RadioController(ILogger<RadioController> logger, RadioStation[] radioStations, IConfiguration config)
        {
            _logger = logger;
            RadioStations = radioStations;
            _config = config;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(RadioStations);
        }
        
        [HttpGet("current")]
        public IActionResult GetCurrent()
        {
            return Ok(CurrentStation);
        }

        [HttpGet("play/{countryCode}/{radioId}")]
        public IActionResult Play(string countryCode, string radioId)
        {
            _mPlayer?.Kill(true);
            var radioStation = RadioStations.SingleOrDefault(rs =>
                string.Equals(rs.CountryCode, countryCode, StringComparison.CurrentCultureIgnoreCase) &&
                string.Equals(rs.Id, radioId, StringComparison.CurrentCultureIgnoreCase));

            if (radioStation == null)
            {
                return BadRequest();
            }

            var command = _config.GetValue<string>("playerCommand");
            _mPlayer = Process.Start("/bin/bash", $"-c \"{command} '{radioStation.Url}'\" ");
            CurrentStation = radioStation;
            return Ok();
        }

        [HttpGet("stop")]
        public IActionResult Stop()
        {
            if (_mPlayer == null)
            {
                return BadRequest();
            }

            _mPlayer.Kill(true);
            _mPlayer = null;
            CurrentStation = null;
            return Ok();
        }
    }
}