using System;

class CentralBank
{
    public static string DisplayDenomination(long @base, long multiplier)
    {
        try
        {
            long result = checked(@base * multiplier);
            return result.ToString();
        }
        catch (OverflowException)
        {
            return "*** Too Big ***";
        }
    }

    public static string DisplayGDP(float @base, float multiplier)
    {
        float result = @base * multiplier;

        if (float.IsInfinity(result))
        {
            return "*** Too Big ***";
        }

        return result.ToString();
    }

    public static string DisplayChiefEconomistSalary(decimal @base, decimal multiplier)
    {
        try
        {
            decimal result = @base * multiplier;
            return result.ToString();
        }
        catch (OverflowException)
        {
            return "*** Much Too Big ***";
        }
    }
}