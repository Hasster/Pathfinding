using System.Numerics;

namespace pathfinder1API.Pathfinding.Models
{
    public class GridTile
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Cost { get; set; }
        public int Distance { get; set; }
        public int CostDistance => Cost + Distance;
        public GridTile Parent { get; set; }

        public void SetDistance(int targetX, int targetY)
        {
            this.Distance = Math.Abs(targetX - X) + Math.Abs(targetY - Y);
        }

        public void SetCoords(Vector2 coords)
        {
            this.X= (int) coords.X;
            this.Y= (int) coords.Y;
        }
    }
}
