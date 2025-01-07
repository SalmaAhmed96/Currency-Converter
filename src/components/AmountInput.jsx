import React from 'react';

const AmountInput = ({ amount, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Amount</label>
    <input
      type="number"
      value={amount}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
);

export default AmountInput;
