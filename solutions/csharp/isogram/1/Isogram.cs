public static class Isogram
{
    public static bool IsIsogram(string word)
{
    var seen = new HashSet<char>();

    foreach (char c in word.ToLower())
    {
        if (c == ' ' || c == '-')
            continue;

        if (seen.Contains(c))
            return false;

        seen.Add(c);
    }

    return true;
}
}
