static class DialingCodes
{
    public static Dictionary<int, string> GetEmptyDictionary()
    {
        return new Dictionary<int, string>();
    }

    public static Dictionary<int, string> GetExistingDictionary()
    {
        return new Dictionary<int, string>
        {
            { 1, "United States of America" },
            { 55, "Brazil" },
            { 91, "India" }
        };
    }

    public static Dictionary<int, string> AddCountryToEmptyDictionary(int code, string countryName)
    {
        var dictionary = new Dictionary<int, string>();
        dictionary.Add(code, countryName);
        return dictionary;
    }

    public static Dictionary<int, string> AddCountryToExistingDictionary(
        Dictionary<int, string> dictionary, int code, string countryName)
    {
        dictionary.Add(code, countryName);
        return dictionary;
    }

    public static string GetCountryNameFromDictionary(Dictionary<int, string> dictionary, int code)
    {
        if (dictionary.ContainsKey(code))
        {
            return dictionary[code];
        }

        return string.Empty;
    }

    public static bool CheckCodeExists(Dictionary<int, string> dictionary, int code)
    {
        return dictionary.ContainsKey(code);
    }

    public static Dictionary<int, string> UpdateDictionary(
        Dictionary<int, string> dictionary, int code, string countryName)
    {
        if (dictionary.ContainsKey(code))
        {
            dictionary[code] = countryName;
        }

        return dictionary;
    }

    public static Dictionary<int, string> RemoveCountryFromDictionary(
        Dictionary<int, string> dictionary, int code)
    {
        dictionary.Remove(code);
        return dictionary;
    }

    public static string FindLongestCountryName(Dictionary<int, string> dictionary)
    {
        string longest = "";

        foreach (var country in dictionary.Values)
        {
            if (country.Length > longest.Length)
            {
                longest = country;
            }
        }

        return longest;
    }
}