import React, { useState } from 'react';
import { fetchHistoricalRates } from '../api/currencyApi';

const HistoricalRates = ({ baseCurrency, targetCurrency }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [historicalRates, setHistoricalRates] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchHistoricalRates = async () => {
    try {
      const data = await fetchHistoricalRates(baseCurrency, targetCurrency, startDate, endDate);
      setHistoricalRates(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
      <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">End Date</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
      <div className="button-group">
        <button onClick={handleFetchHistoricalRates} className="mt-4 p-2 bg-blue-500 text-white rounded">Fetch Historical Rates</button>
      </div>
      {error && <div className="alert alert-error mt-4">{error}</div>}
      {historicalRates && (
        <div className="mt-4 p-4 border rounded bg-white">
          <h2 className="text-xl font-bold mb-2">Historical Rates</h2>
          {Object.entries(historicalRates.conversion_rates).map(([date, rate]) => (
            <p key={date}>{date}: {rate[targetCurrency]}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricalRates;
