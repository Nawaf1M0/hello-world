using System;
using System.Collections.Generic;
using System.Linq;

public class Anagram
{
    private readonly string target;

    public Anagram(string target)
    {
        this.target = target;
    }

    public string[] FindAnagrams(string[] potentialMatches)
    {
        string normalizedTarget = target.ToLower();
        string sortedTarget = SortLetters(normalizedTarget);

        return potentialMatches
            .Where(candidate =>
            {
                string normalizedCandidate = candidate.ToLower();

                return normalizedCandidate != normalizedTarget &&
                       SortLetters(normalizedCandidate) == sortedTarget;
            })
            .ToArray();
    }

    private static string SortLetters(string word)
    {
        return new string(word.OrderBy(c => c).ToArray());
    }
}