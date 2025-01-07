import React from 'react';

const ConversionResult = ({ result }) => (
  <div className="p-4 border rounded bg-white mt-4">
    {result ? <p>Converted Amount: {result}</p> : <p>Enter amount and select currencies to see the result.</p>}
  </div>
);

export default ConversionResult;
