import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from './api/currencyApi';
import CurrencySelector from './components/CurrencySelector.jsx';
import AmountInput from './components/AmountInput.jsx';
import ConversionResult from './components/ConversionResult.jsx';
import HistoricalRates from './components/HistoricalRates.jsx';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [desiredRate, setDesiredRate] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [results, setResults] = useState([]);
  const [targetCurrencies, setTargetCurrencies] = useState(['EUR', 'GBP', 'JPY']);
  const [lastUpdate, setLastUpdate] = useState('');
  const [currentRate, setCurrentRate] = useState(null);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const data = await fetchExchangeRates(baseCurrency);
        setExchangeRates(data.conversion_rates);
        setCurrencies(Object.keys(data.conversion_rates));
        setLastUpdate(data.time_last_update_utc);
        setCurrentRate(data.conversion_rates[targetCurrency]);
      } catch (error) {
        setError(error.message);
      }
    };

    getCurrencies();
  }, [baseCurrency, targetCurrency]);

  const handleConvert = () => {
    if (exchangeRates[targetCurrency]) {
      const conversionResult = (amount * exchangeRates[targetCurrency]).toFixed(2);
      setResult(conversionResult);
    }
  };

  const handleMultiConvert = () => {
    const conversionResults = targetCurrencies.map(currency => {
      if (exchangeRates[currency]) {
        return { currency, amount: (amount * exchangeRates[currency]).toFixed(2) };
      }
      return null;
    }).filter(result => result !== null);
    setResults(conversionResults);
  };

  const addFavorite = () => {
    const newFavorite = { baseCurrency, targetCurrency };
    setFavorites([...favorites, newFavorite]);
  };

  const selectFavorite = (favorite) => {
    setBaseCurrency(favorite.baseCurrency);
    setTargetCurrency(favorite.targetCurrency);
  };

  const addAlert = () => {
    const newAlert = { baseCurrency, targetCurrency, rate: parseFloat(desiredRate) };
    setAlerts([...alerts, newAlert]);
  };

  useEffect(() => {
    alerts.forEach(alert => {
      if (exchangeRates[alert.targetCurrency] && exchangeRates[alert.targetCurrency] >= alert.rate) {
        setAlertMessage(`Alert: ${alert.targetCurrency} rate reached ${alert.rate}!`);
      }
    });
  }, [exchangeRates]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}
      {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
      <button onClick={toggleDarkMode} className="dark-mode">Dark Mode</button>
      <div className="p-4 max-w-md mx-auto dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
        <CurrencySelector currencies={currencies} selectedCurrency={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} />
        <CurrencySelector currencies={currencies} selectedCurrency={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)} />
        <AmountInput amount={amount} onChange={(e) => setAmount(e.target.value)} />

        <div className="text-center mt-4">
          <p>Current Exchange Rate: {currentRate}</p>
          <p>Last Updated: {lastUpdate}</p>
        </div>

        <div className="button-group">
          <button onClick={handleConvert} className="mt-4 p-2 bg-blue-500 text-white rounded">Convert</button>
          <button onClick={handleMultiConvert} className="mt-4 p-2 bg-green-500 text-white rounded">Convert to Multiple Currencies</button>
        </div>
        
        <ConversionResult result={result} />

        {results.map((result, index) => (
          <div key={index} className="box">
            <p>{result.currency}: {result.amount}</p>
          </div>
        ))}

        <div className="button-group">
          <button onClick={addFavorite} className="p-2 bg-green-500 text-white rounded">Add to Favorites</button>
        </div>

        {favorites.map((pair, index) => (
          <div key={index} className="box">
            <p>{pair.baseCurrency} to {pair.targetCurrency}</p>
            <div className="button-group">
              <button onClick={() => selectFavorite(pair)} className="p-2 bg-gray-500 text-white rounded">Select</button>
            </div>
          </div>
        ))}

        <HistoricalRates baseCurrency={baseCurrency} targetCurrency={targetCurrency} />

        <div className="box mt-4">
          <input type="number" value={desiredRate} onChange={(e) => setDesiredRate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Desired Rate" />
          <div className="button-group">
            <button onClick={addAlert} className="p-2 bg-yellow-500 text-white rounded">Set Alert</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
