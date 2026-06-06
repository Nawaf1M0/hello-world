using System;
using System.Collections.Generic;

public static class Say
{
    private static readonly string[] Ones =
    {
        "zero", "one", "two", "three", "four",
        "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen",
        "fourteen", "fifteen", "sixteen",
        "seventeen", "eighteen", "nineteen"
    };

    private static readonly string[] Tens =
    {
        "", "", "twenty", "thirty", "forty",
        "fifty", "sixty", "seventy", "eighty", "ninety"
    };

    public static string InEnglish(long number)
    {
        if (number < 0 || number > 999_999_999_999)
            throw new ArgumentOutOfRangeException();

        if (number == 0)
            return Ones[0];

        var parts = new List<string>();

        AddPart(parts, number, 1_000_000_000, "billion");
        number %= 1_000_000_000;

        AddPart(parts, number, 1_000_000, "million");
        number %= 1_000_000;

        AddPart(parts, number, 1_000, "thousand");
        number %= 1_000;

        if (number > 0)
            parts.Add(ConvertHundreds((int)number));

        return $"{string.Join(" ", parts)}";
    }

    private static void AddPart(List<string> parts, long number, long divisor, string scale)
    {
        long chunk = number / divisor;

        if (chunk > 0)
            parts.Add($"{ConvertHundreds((int)chunk)} {scale}");
    }

    private static string ConvertHundreds(int number)
    {
        var parts = new List<string>();

        if (number >= 100)
        {
            parts.Add($"{Ones[number / 100]} hundred");
            number %= 100;
        }

        if (number >= 20)
        {
            string tensWord = $"{Tens[number / 10]}";

            if (number % 10 > 0)
                tensWord = $"{tensWord}-{Ones[number % 10]}";

            parts.Add(tensWord);
        }
        else if (number > 0)
        {
            parts.Add($"{Ones[number]}");
        }

        return $"{string.Join(" ", parts)}";
    }
}