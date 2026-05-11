class TelemetryBuffer
{
    public static byte[] ToBuffer(long reading)
    {
        byte[] buffer = new byte[9];

        if (reading >= 0 && reading <= ushort.MaxValue)
        {
            buffer[0] = 2;
            BitConverter.GetBytes((ushort)reading).CopyTo(buffer, 1);
        }
        else if (reading >= ushort.MaxValue + 1L && reading <= int.MaxValue)
        {
            buffer[0] = 256 - 4; // signed int
            BitConverter.GetBytes((int)reading).CopyTo(buffer, 1);
        }
        else if (reading >= int.MaxValue + 1L && reading <= uint.MaxValue)
        {
            buffer[0] = 4;
            BitConverter.GetBytes((uint)reading).CopyTo(buffer, 1);
        }
        else if (reading >= uint.MaxValue + 1L)
        {
            buffer[0] = 256 - 8; // signed long
            BitConverter.GetBytes(reading).CopyTo(buffer, 1);
        }
        else if (reading >= short.MinValue)
        {
            buffer[0] = 256 - 2; // signed short
            BitConverter.GetBytes((short)reading).CopyTo(buffer, 1);
        }
        else if (reading >= int.MinValue)
        {
            buffer[0] = 256 - 4; // signed int
            BitConverter.GetBytes((int)reading).CopyTo(buffer, 1);
        }
        else
        {
            buffer[0] = 256 - 8; // signed long
            BitConverter.GetBytes(reading).CopyTo(buffer, 1);
        }

        return buffer;
    }

    public static long FromBuffer(byte[] buffer)
    {
        return buffer[0] switch
        {
            2 => BitConverter.ToUInt16(buffer, 1),
            4 => BitConverter.ToUInt32(buffer, 1),
            254 => BitConverter.ToInt16(buffer, 1),
            252 => BitConverter.ToInt32(buffer, 1),
            248 => BitConverter.ToInt64(buffer, 1),
            _ => 0
        };
    }
}