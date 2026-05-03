class FacialFeatures
{
    public string EyeColor { get; }
    public decimal PhiltrumWidth { get; }

    public FacialFeatures(string eyeColor, decimal philtrumWidth)
    {
        EyeColor = eyeColor;
        PhiltrumWidth = philtrumWidth;
    }

    public override bool Equals(object? obj)
    {
        if (obj is not FacialFeatures other)
        {
            return false;
        }

        return EyeColor == other.EyeColor
            && PhiltrumWidth == other.PhiltrumWidth;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(EyeColor, PhiltrumWidth);
    }
}

class Identity
{
    public string Email { get; }
    public FacialFeatures FacialFeatures { get; }

    public Identity(string email, FacialFeatures facialFeatures)
    {
        Email = email;
        FacialFeatures = facialFeatures;
    }

    public override bool Equals(object? obj)
    {
        if (obj is not Identity other)
        {
            return false;
        }

        return Email == other.Email
            && FacialFeatures.Equals(other.FacialFeatures);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Email, FacialFeatures);
    }
}

class Authenticator
{
    private readonly HashSet<Identity> _registeredIdentities = new();

    public static bool AreSameFace(FacialFeatures faceA, FacialFeatures faceB)
    {
        return faceA.Equals(faceB);
    }

    public bool IsAdmin(Identity identity)
    {
        var admin = new Identity(
            "admin@exerc.ism",
            new FacialFeatures("green", 0.9m)
        );

        return identity.Equals(admin);
    }

    public bool Register(Identity identity)
    {
        return _registeredIdentities.Add(identity);
    }

    public bool IsRegistered(Identity identity)
    {
        return _registeredIdentities.Contains(identity);
    }

    public static bool AreSameObject(Identity identityA, Identity identityB)
    {
        return object.ReferenceEquals(identityA, identityB);
    }
}