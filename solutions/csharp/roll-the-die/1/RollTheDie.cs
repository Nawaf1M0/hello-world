class Player
{
    private Random _random = new Random();

    public int RollDie()
    {
        return _random.Next(1, 19); // 1 to 18
    }

    public double GenerateSpellStrength()
    {
        return _random.NextDouble() * 100; // 0.0 to <100.0
    }
}