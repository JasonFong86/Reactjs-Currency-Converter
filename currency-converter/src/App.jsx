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
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/6c232f2ccae7317e058555ba/latest/${fromCurrency}`
        )
        const data = await response.json()
        setRates(data.conversion_rates)
        setCurrencies(Object.keys(data.conversion_rates)); // Extracting the list of currencies
      } catch (error) {
        console.error("Error fetching exchange rates:", error)
      }
    }
    fetchExchangeRates()
  }, [fromCurrency])

  const handleConvert = () => {
    if (rates[toCurrency]) {
      const result = amount * rates[toCurrency]
      setConvertedAmount(result.toFixed(2))
    }
  }

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="input-group">
        <input
          type="number"
          id="from-amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount"/>
        <select
          id="from-currency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <input type="number" id="to-amount" value={convertedAmount} />
        <select
          id="to-currency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}>
         {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button id="convert-btn" onClick={handleConvert}>
        Convert
      </button>
    </div>
  )
}

export default App;