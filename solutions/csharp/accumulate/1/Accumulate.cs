using System;
using System.Collections.Generic;

public static class AccumulateExtensions
{
    public static IEnumerable<TResult> Accumulate<T, TResult>(
        this IEnumerable<T> collection,
        Func<T, TResult> func)
    {
        foreach (var item in collection)
        {
            yield return func(item);
        }
    }
}