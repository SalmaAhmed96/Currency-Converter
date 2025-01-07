import axios from 'axios';

const API_KEY = '1a0a602352db5a8ddd3c530c';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates. Please try again later.');
  }
};

export const fetchHistoricalRates = async (baseCurrency, targetCurrency, startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/history/${baseCurrency}/${targetCurrency}?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical rates:', error);
    throw new Error('Failed to fetch historical rates. Please try again later.');
  }
};
