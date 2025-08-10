import React, { useState, useEffect } from 'react';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'CAD', 'AUD', 'ZAR'];

const CurrencyCalculator = () => {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (!amount) return;
    fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
      .then(res => res.json())
      .then(data => setResult(data.result))
      .catch(() => setResult(null));
  }, [from, to, amount]);

  return (
    <div className="p-3 w-64">
      <div className="flex gap-2 mb-2">
        <select value={from} onChange={e => setFrom(e.target.value)} className="border rounded p-1">
          {CURRENCIES.map(cur => <option key={cur} value={cur}>{cur}</option>)}
        </select>
        <span className="self-center">→</span>
        <select value={to} onChange={e => setTo(e.target.value)} className="border rounded p-1">
          {CURRENCIES.map(cur => <option key={cur} value={cur}>{cur}</option>)}
        </select>
      </div>
      <input type="number" min="0" value={amount} onChange={e => setAmount(Number(e.target.value))} className="border rounded p-1 w-full mb-2" />
      <div className="text-sm text-gray-700 dark:text-gray-200">
        {typeof result === 'number' && !isNaN(result)
          ? `${amount} ${from} = ${result.toFixed(2)} ${to}`
          : 'Conversion unavailable'}
      </div>
    </div>
  );
};

export default CurrencyCalculator; 