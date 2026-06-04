using System;
using System.Linq;
using System.Text.RegularExpressions;

public static class Acronym
{
    public static string Abbreviate(string phrase) => string.Concat(
            Regex.Replace(phrase, @"[^\w\s-]", "")
                .Replace("-", " ")
                .Replace("_", " ")
                .Split(" ", StringSplitOptions.RemoveEmptyEntries)
                .Select(word => char.ToUpper(word[0])));
    
}