class SimpleCalculator
{
    public static string Calculate(int a, int b, string operation)
    {
        if (operation == null)
        {
            throw new ArgumentNullException(nameof(operation));
        }

        if (operation == "")
        {
            throw new ArgumentException("Operation cannot be empty.", nameof(operation));
        }

        try
        {
            int result = operation switch
            {
                "+" => a + b,
                "*" => a * b,
                "/" => a / b,
                _ => throw new ArgumentOutOfRangeException(nameof(operation), "Invalid operation")
            };

            return $"{a} {operation} {b} = {result}";
        }
        catch (DivideByZeroException)
        {
            return "Division by zero is not allowed.";
        }
    }
}