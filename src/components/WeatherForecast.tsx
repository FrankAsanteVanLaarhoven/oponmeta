import React, { useState, useEffect } from 'react';

const WeatherForecast = () => {
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => { setError('Location denied'); setLoading(false); }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;
    setLoading(true);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,weathercode&timezone=auto`)
      .then(res => res.json())
      .then(data => {
        setForecast(data.daily.time.map((date: string, i: number) => ({
          date,
          temp: data.daily.temperature_2m_max[i],
          code: data.daily.weathercode[i],
        })));
        setLoading(false);
      })
      .catch(() => { setError('Weather unavailable'); setLoading(false); });
  }, [coords]);

  const getIcon = (code: number) => {
    // Simple mapping for demo
    if ([0, 1].includes(code)) return '☀️';
    if ([2, 3].includes(code)) return '⛅';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
    if ([95, 96, 99].includes(code)) return '⛈️';
    return '❔';
  };

  if (loading) return <div className="p-3 w-64 text-center">Loading weather...</div>;
  if (error) return <div className="p-3 w-64 text-center text-red-500">{error}</div>;

  return (
    <div className="p-3 w-64">
      <div className="font-semibold mb-2">7-Day Forecast</div>
      <div className="grid grid-cols-4 gap-2">
        {forecast.map((day, i) => (
          <div key={i} className="flex flex-col items-center text-xs">
            <span>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
            <span className="text-2xl">{getIcon(day.code)}</span>
            <span>{day.temp}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast; 