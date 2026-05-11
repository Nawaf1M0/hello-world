using System.Text;

class Identifier
{
    public static string Clean(string identifier)
    {
        var result = new StringBuilder();
        bool makeUpper = false;

        foreach (char c in identifier)
        {
            // 1. Replace spaces with _
            if (c == ' ')
            {
                result.Append('_');
                continue;
            }

            // 2. Replace control chars with "CTRL"
            if (char.IsControl(c))
            {
                result.Append("CTRL");
                continue;
            }

            // 3. Handle kebab-case (-)
            if (c == '-')
            {
                makeUpper = true;
                continue;
            }

            // 4. Skip non-letters
            if (!char.IsLetter(c))
            {
                continue;
            }

            // 5. Skip Greek letters α to ω
            if (c >= 'α' && c <= 'ω')
            {
                continue;
            }

            // 6. Apply uppercase if needed (camelCase)
            if (makeUpper)
            {
                result.Append(char.ToUpper(c));
                makeUpper = false;
            }
            else
            {
                result.Append(c);
            }
        }

        return result.ToString();
    }
}