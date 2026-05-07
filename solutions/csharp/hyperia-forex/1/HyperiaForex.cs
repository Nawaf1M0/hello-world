public struct CurrencyAmount
{
    public decimal Amount { get; }
    public string Currency { get; }

    public CurrencyAmount(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }

    private static void CheckCurrency(CurrencyAmount left, CurrencyAmount right)
    {
        if (left.Currency != right.Currency)
        {
            throw new ArgumentException("Currencies must match.");
        }
    }

    public static bool operator ==(CurrencyAmount left, CurrencyAmount right)
    {
        CheckCurrency(left, right);
        return left.Amount == right.Amount;
    }

    public static bool operator !=(CurrencyAmount left, CurrencyAmount right)
    {
        CheckCurrency(left, right);
        return left.Amount != right.Amount;
    }

    public static bool operator >(CurrencyAmount left, CurrencyAmount right)
    {
        CheckCurrency(left, right);
        return left.Amount > right.Amount;
    }

    public static bool operator <(CurrencyAmount left, CurrencyAmount right)
    {
        CheckCurrency(left, right);
        return left.Amount < right.Amount;
    }

    public static CurrencyAmount operator +(CurrencyAmount left, CurrencyAmount right)
    {
        CheckCurrency(left, right);
        return new CurrencyAmount(left.Amount + right.Amount, left.Currency);
    }

    public static CurrencyAmount operator -(CurrencyAmount left, CurrencyAmount right)
    {
        CheckCurrency(left, right);
        return new CurrencyAmount(left.Amount - right.Amount, left.Currency);
    }

    public static CurrencyAmount operator *(CurrencyAmount amount, decimal multiplier)
    {
        return new CurrencyAmount(amount.Amount * multiplier, amount.Currency);
    }

    public static CurrencyAmount operator /(CurrencyAmount amount, decimal divisor)
    {
        return new CurrencyAmount(amount.Amount / divisor, amount.Currency);
    }

    public static explicit operator double(CurrencyAmount amount)
    {
        return (double)amount.Amount;
    }

    public static implicit operator decimal(CurrencyAmount amount)
    {
        return amount.Amount;
    }

    public override bool Equals(object? obj)
    {
        return obj is CurrencyAmount other
            && Currency == other.Currency
            && Amount == other.Amount;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Amount, Currency);
    }
}