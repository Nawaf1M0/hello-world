public static class SpiralMatrix
{
    public static int[,] GetMatrix(int size)
    {
        var matrix = new int[size, size];

        int top = 0;
        int bottom = size - 1;
        int left = 0;
        int right = size - 1;

        int number = 1;

        while (top <= bottom && left <= right)
        {
            // Left -> Right
            for (int col = left; col <= right; col++)
            {
                matrix[top, col] = number++;
            }
            top++;

            // Top -> Bottom
            for (int row = top; row <= bottom; row++)
            {
                matrix[row, right] = number++;
            }
            right--;

            // Right -> Left
            if (top <= bottom)
            {
                for (int col = right; col >= left; col--)
                {
                    matrix[bottom, col] = number++;
                }
                bottom--;
            }

            // Bottom -> Top
            if (left <= right)
            {
                for (int row = bottom; row >= top; row--)
                {
                    matrix[row, left] = number++;
                }
                left++;
            }
        }

        return matrix;
    }
}