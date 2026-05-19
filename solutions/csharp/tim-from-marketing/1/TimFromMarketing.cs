class Badge
{
    public static string Print(int? id, string name, string? department)
    {
        string dept = department?.ToUpper() ?? "OWNER";

        if (id == null)
        {
            return $"{name} - {dept}";
        }

        return $"[{id}] - {name} - {dept}";
    }
}