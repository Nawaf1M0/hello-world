public static class RotationalCipher
{
    public static string Rotate(string text, int shiftKey)
    {
        char RotateChar(char c)
        {
            if (char.IsLower(c))
            {
                return (char)('a' + (c - 'a' + shiftKey) % 26);
            }

            if (char.IsUpper(c))
            {
                return (char)('A' + (c - 'A' + shiftKey) % 26);
            }

            return c;
        }

        return new string(text.Select(RotateChar).ToArray());
    }
}