abstract class Character
{
    public abstract int DamagePoints(Character target);

    public virtual bool Vulnerable()
    {
        return false;
    }

    public override string ToString()
    {
        return $"Character is a {GetType().Name}";
    }
}

class Warrior : Character
{
    public override int DamagePoints(Character target)
    {
        if (target.Vulnerable())
        {
            return 10;
        }

        return 6;
    }
}

class Wizard : Character
{
    private bool _spellPrepared = false;

    public void PrepareSpell()
    {
        _spellPrepared = true;
    }

    public override bool Vulnerable()
    {
        return !_spellPrepared;
    }

    public override int DamagePoints(Character target)
    {
        if (_spellPrepared)
        {
            return 12;
        }

        return 3;
    }
}