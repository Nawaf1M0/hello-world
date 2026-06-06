public static class LogAnalysis
{
    public static string SubstringAfter(this string str, string delimiter)
    {
        int index = str.IndexOf(delimiter);

        return str.Substring(index + delimiter.Length);
    }

    public static string SubstringBetween(
        this string str,
        string startDelimiter,
        string endDelimiter)
    {
        int start = str.IndexOf(startDelimiter)
                    + startDelimiter.Length;

        int end = str.IndexOf(endDelimiter);

        return str.Substring(start, end - start);
    }

    public static string Message(this string str)
    {
        return str.SubstringAfter(": ");
    }

    public static string LogLevel(this string str)
    {
        return str.SubstringBetween("[", "]");
    }
}