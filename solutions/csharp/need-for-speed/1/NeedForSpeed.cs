class RemoteControlCar
{
    private int _speed;
    private int _batteryDrain;
    private int _battery = 100;
    private int _distance = 0;

    public RemoteControlCar(int speed, int batteryDrain)
    {
        _speed = speed;
        _batteryDrain = batteryDrain;
    }

    public void Drive()
    {
        if (_battery < _batteryDrain)
        {
            return;
        }

        _distance += _speed;
        _battery -= _batteryDrain;
    }

    public int DistanceDriven()
    {
        return _distance;
    }

    public bool BatteryDrained()
    {
        return _battery < _batteryDrain;
    }

    public static RemoteControlCar Nitro()
    {
        return new RemoteControlCar(50, 4);
    }
}

class RaceTrack
{
    private int _distance;

    public RaceTrack(int distance)
    {
        _distance = distance;
    }

    public bool TryFinishTrack(RemoteControlCar car)
    {
        // How many times can the car drive?
        int maxDrives = 100 / carBatteryDrain(car);

        // Total distance possible
        int totalDistance = maxDrives * carSpeed(car);

        return totalDistance >= _distance;
    }

    // Helper methods (since fields are private)
    private int carSpeed(RemoteControlCar car)
    {
        return (int)car.GetType()
            .GetField("_speed", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)
            .GetValue(car);
    }

    private int carBatteryDrain(RemoteControlCar car)
    {
        return (int)car.GetType()
            .GetField("_batteryDrain", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)
            .GetValue(car);
    }
}
