using System.Text;

public static class RomanNumeralExtension
{
    public static string ToRoman(this int value)
    {
        int[] values =
        {
            1000, 900, 500, 400,
            100, 90, 50, 40,
            10, 9, 5, 4, 1
        };

        string[] numerals =
        {
            "M", "CM", "D", "CD",
            "C", "XC", "L", "XL",
            "X", "IX", "V", "IV", "I"
        };

        StringBuilder result = new StringBuilder();

        for (int i = 0; i < values.Length; i++)
        {
            while (value >= values[i])
            {
                result.Append(numerals[i]);
                value -= values[i];
            }
        }

        return result.ToString();
    }
}