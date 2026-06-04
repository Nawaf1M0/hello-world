public static class Bob
{
    public static string Response(string statement)
    {
        if (string.IsNullOrWhiteSpace(statement))
            return "Fine. Be that way!";

        bool isQuestion =
            statement.TrimEnd().EndsWith('?');

        bool hasLetters =
            statement.Any(char.IsLetter);

        bool isYelling =
            hasLetters &&
            statement.Where(char.IsLetter)
                     .All(char.IsUpper);

        if (isQuestion && isYelling)
            return "Calm down, I know what I'm doing!";

        if (isYelling)
            return "Whoa, chill out!";

        if (isQuestion)
            return "Sure.";

        return "Whatever.";
    }
}