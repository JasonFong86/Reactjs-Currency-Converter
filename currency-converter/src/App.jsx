import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Fetch supported currencies and their full names
    const fetchSupportedCodes = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/6c232f2ccae7317e058555ba/codes`
        );
        const data = await response.json();
        setCurrencies(data.supported_codes); // Store the array of [code, name]
      } catch (error) {
        console.error("Error fetching supported codes:", error);
      }
    };

    // Fetch exchange rates for the default 'fromCurrency'
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/6c232f2ccae7317e058555ba/latest/${fromCurrency}`
        );
        const data = await response.json();
        setRates(data.conversion_rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchSupportedCodes();
    fetchExchangeRates();
  }, [fromCurrency]);

  const handleConvert = () => {
    if (rates[toCurrency]) {
      const result = amount * rates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map(([code, name]) => (
            <option key={code} value={code}>
              {name} ({code})
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <input type="number" value={convertedAmount} readOnly />
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map(([code, name]) => (
            <option key={code} value={code}>
              {name} ({code})
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
}

export default App;