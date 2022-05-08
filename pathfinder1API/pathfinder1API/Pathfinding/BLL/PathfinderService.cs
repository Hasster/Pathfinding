using System.Numerics;
using pathfinder1API.Pathfinding.Models;

namespace pathfinder1API.Pathfinding.BLL
{
    public class PathfinderService
    {
        public static IEnumerable<string> ProcessGrid(Grid_DTO_IN grid)
        {
            var path = new List<string>();
            var map = ConvertMapToArray(grid.GridRoles);
            var startTile = new GridTile();
            var targetTile = new GridTile();
            startTile.SetCoords(FindPoint(2, map));
            targetTile.SetCoords(FindPoint(3, map));

            startTile.SetDistance(targetTile.X, targetTile.Y);
            var openList = new List<GridTile> { startTile };
            var closedList = new List<GridTile>();

            while (openList.Any())
            {
                var currentTile = openList.OrderBy(x => x.CostDistance).First();
                if (IsSameTile(currentTile,targetTile))
                {
                    Console.WriteLine("Path found! Tiles backwards:");

                    while (currentTile != null)
                    {
                        Console.WriteLine($"{currentTile.X} : {currentTile.Y}");
                        path.Insert(0, $"{currentTile.X} : {currentTile.Y}");
                        currentTile = currentTile.Parent;
                    }
                    //arrived at destination
                    Console.WriteLine(openList);
                    Console.WriteLine(closedList);
                    return path;
                }
                closedList.Add(currentTile);
                openList.Remove(currentTile);
                var walkableTiles = GetWalkableTiles(map, currentTile, targetTile);
                foreach (var walkableTile in walkableTiles)
                {
                    if (closedList.Any(visitedTile => IsSameTile(visitedTile,walkableTile))) continue;
                    if (openList.Any(activeTile => IsSameTile(activeTile,walkableTile)))
                    {
                        var existingTile = openList.First(activeTile => IsSameTile(activeTile,walkableTile));
                        if (existingTile.CostDistance > currentTile.CostDistance)//was currentTile vs walkable tile
                        {
                            openList.Remove(existingTile);
                        }
                    }
                        openList.Add(walkableTile);
                }
            }
            //no path found!
            Console.WriteLine(openList);
            Console.WriteLine(closedList);
            throw new Exception("No path found");
        }

        private static bool IsSameTile(GridTile tileA, GridTile tileB)
        {
            return tileA.X == tileB.X && tileA.Y == tileB.Y;
        }

        private static Vector2 FindPoint(int valueToSearchFor, int[][] map)
        {
            for (int y = 0; y < map.Length; y++)
            {
                for (int x = 0; x < map[y].Length; x++)
                {
                    if (map[y][x] == valueToSearchFor) return new Vector2(x, y);
                }
            }

            throw new KeyNotFoundException($"Unable to find specified point: {valueToSearchFor}");
        }

        private static int[][] ConvertMapToArray(IEnumerable<IEnumerable<int>> map)
        {
            int ySize = map.Count();
            int[][] mapArray = new int[ySize][];
            int i = 0;

            foreach (var row in map)
            {
                mapArray[i++] = row.ToArray();
            }

            return mapArray;
        }

        private static List<GridTile> GetWalkableTiles(int[][] map, GridTile currentTile, GridTile targetTile)
        {
            var possibleTiles = new List<GridTile>()
            {
                new GridTile()
                    {X = currentTile.X, Y = currentTile.Y - 1, Parent = currentTile, Cost = currentTile.Cost + 1},
                new GridTile()
                    {X = currentTile.X, Y = currentTile.Y + 1, Parent = currentTile, Cost = currentTile.Cost + 1},
                new GridTile()
                    {X = currentTile.X - 1, Y = currentTile.Y, Parent = currentTile, Cost = currentTile.Cost + 1},
                new GridTile()
                    {X = currentTile.X + 1, Y = currentTile.Y, Parent = currentTile, Cost = currentTile.Cost + 1}
            };
            Console.WriteLine($"Considering tile {currentTile.X} : {currentTile.Y}");
            possibleTiles.ForEach(tile => tile.SetDistance(targetTile.X, targetTile.Y));
            var maxY = map.Length;
            var maxX = map[0].Length;
            var inBounds = possibleTiles.Where(tile => tile.X >= 0 && tile.X < maxX).ToList().Where(tile => tile.Y >= 0 && tile.Y < maxY).ToList();
            var walkable = inBounds.Where(tile => map[tile.X][tile.Y] == 0 || map[tile.X][tile.Y] == 3).ToList();
            return walkable.ToList();

        }
    }
}
