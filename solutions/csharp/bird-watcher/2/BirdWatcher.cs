class BirdCount
{
    private int[] _birdsPerDay;

    public BirdCount(int[] birdsPerDay)
    {
        _birdsPerDay = birdsPerDay;
    }

    public static int[] LastWeek()=>new int[] { 0, 2, 5, 3, 7, 8, 4 };

    public int Today()=>_birdsPerDay[_birdsPerDay.Length - 1];

    public void IncrementTodaysCount()
    {
        _birdsPerDay[_birdsPerDay.Length - 1]++;
    }

    public bool HasDayWithoutBirds()
    {
        foreach (int birds in _birdsPerDay)
        {
            if (birds == 0)
            {
                return true;
            }
        }
        return false;
    }

    public int CountForFirstDays(int numberOfDays)
    {
        int sum = 0;

        for (int i = 0; i < numberOfDays && i < _birdsPerDay.Length; i++)
        {
            sum += _birdsPerDay[i];
        }

        return sum;
    }

    public int BusyDays()
    {
        int count = 0;

        foreach (int birds in _birdsPerDay)
        {
            if (birds >= 5)
            {
                count++;
            }
        }

        return count;
    }
}