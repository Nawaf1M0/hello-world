using System.Collections.Generic;

class Languages
{
    public static List<string> NewList()
    {
        return new List<string>();
    }

    public static List<string> GetExistingLanguages()
    {
        return new List<string> { "C#", "Clojure", "Elm" };
    }

    public static List<string> AddLanguage(List<string> languages, string language)
    {
        languages.Add(language);
        return languages;
    }

    public static int CountLanguages(List<string> languages)
    {
        return languages.Count;
    }

    public static bool HasLanguage(List<string> languages, string language)
    {
        return languages.Contains(language);
    }

    public static List<string> ReverseList(List<string> languages)
    {
        languages.Reverse();
        return languages;
    }

    public static bool IsExciting(List<string> languages)
    {
        // Case 1: first is "C#"
        if (languages.Count > 0 && languages[0] == "C#")
        {
            return true;
        }

        // Case 2: second is "C#" AND list size is 2 or 3
        if (languages.Count >= 2 &&
            languages[1] == "C#" &&
            (languages.Count == 2 || languages.Count == 3))
        {
            return true;
        }

        return false;
    }

    public static List<string> RemoveLanguage(List<string> languages, string language)
    {
        languages.Remove(language);
        return languages;
    }

    public static bool IsUnique(List<string> languages)
{
    var seen = new HashSet<string>();

    foreach (var language in languages)
    {
        if (seen.Contains(language))
        {
            return false;
        }

        seen.Add(language);
    }

    return true;
}
}