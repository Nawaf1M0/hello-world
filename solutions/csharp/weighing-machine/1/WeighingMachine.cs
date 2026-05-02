class WeighingMachine
{
    public int Precision { get; }

    private double _weight;

    public double Weight
    {
        get => _weight;
        set
        {
            if (value < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(Weight), "Weight cannot be negative.");
            }

            _weight = value;
        }
    }

    public double TareAdjustment { get; set; } = 5.0;

    public string DisplayWeight
    {
        get
        {
            double display = Weight - TareAdjustment;
            return $"{Math.Round(display, Precision).ToString($"F{Precision}")} kg";      
        }
    }

    public WeighingMachine(int precision)
    {
        Precision = precision;
    }
}