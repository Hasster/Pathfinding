using Microsoft.AspNetCore.Mvc;
using pathfinder1API.Pathfinding.BLL;
using pathfinder1API.Pathfinding.Models;

namespace pathfinder1API.Controllers
{
    [Route("api")]
    [ApiController]
    public class PathFinder1Controller : ControllerBase
    {
        [HttpGet]
        [Route("PF/Test")]
        public async Task<ActionResult<bool>> Test()
        {
            var mlem = true;
            Thread.Sleep(500);
            return mlem;
        }

        [HttpPost]
        [Route("PF/CalcGrid")]
        public async Task<ActionResult> CalculateGrid([FromBody]Grid_DTO_IN gridRoles)
        {
            var path = PathfinderService.ProcessGrid(gridRoles);

            return Ok(path);
        }
    }
}
