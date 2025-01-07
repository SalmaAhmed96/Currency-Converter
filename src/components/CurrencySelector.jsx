import React from 'react';

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">Select Currency</label>
    <select value={selectedCurrency} onChange={onChange} className="w-full p-2 border border-gray-300 rounded">
      {currencies.map(currency => (
        <option key={currency} value={currency}>{currency}</option>
      ))}
    </select>
  </div>
);

export default CurrencySelector;
