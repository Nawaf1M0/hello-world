public class Clock
{
    private readonly int _minutes;

    public Clock(int hours, int minutes)
    {
        _minutes = Normalize(hours * 60 + minutes);
    }

    public Clock Add(int minutes)
    {
        return new Clock(0, _minutes + minutes);
    }

    public Clock Subtract(int minutes)
    {
        return new Clock(0, _minutes - minutes);
    }

    public override string ToString()
    {
        int hours = _minutes / 60;
        int minutes = _minutes % 60;

        return $"{hours:D2}:{minutes:D2}";
    }

    public override bool Equals(object? obj)
    {
        return obj is Clock other &&
               _minutes == other._minutes;
    }

    public override int GetHashCode()
    {
        return _minutes.GetHashCode();
    }

    private static int Normalize(int minutes)
    {
        return ((minutes % 1440) + 1440) % 1440;
    }
}