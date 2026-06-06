public static class Hamming
{
    public static int Distance(string strand1, string strand2)
{
    if (strand1.Length != strand2.Length)
    {
        throw new ArgumentException("Strands must be of equal length.");
    }

    int distance = 0;

    for (int i = 0; i < strand1.Length; i++)
    {
        if (strand1[i] != strand2[i])
        {
            distance++;
        }
    }

    return distance;
}
}