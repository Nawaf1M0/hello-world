using System.Text;

public static class RunLengthEncoding
{
    public static string Encode(string input)
{
    if (string.IsNullOrEmpty(input))
        return "";

    var result = new StringBuilder();

    char current = input[0];
    int count = 1;

    for (int i = 1; i < input.Length; i++)
    {
        if (input[i] == current)
        {
            count++;
        }
        else
        {
            if (count > 1)
                result.Append(count);

            result.Append(current);

            current = input[i];
            count = 1;
        }
    }

    if (count > 1)
        result.Append(count);

    result.Append(current);

    return result.ToString();
}

    public static string Decode(string input)
{
    var result = new StringBuilder();
    int count = 0;

    foreach (char c in input)
    {
        if (char.IsDigit(c))
        {
            count = count * 10 + (c - '0');
        }
        else
        {
            if (count == 0)
                count = 1;

            result.Append(new string(c, count));
            count = 0;
        }
    }

    return result.ToString();
}
}
