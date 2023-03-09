import React, { useState, useEffect } from "react";
import axios from "axios";
import "flowbite";
import "../App.css";

function Conversions() {
  const [currencyRates, setCurrencyRates] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => setCurrencyRates(response.data.bpi))
      .catch((error) => console.error(error));
  }, []);

  const handleSortClick = () => {
    setSortAscending(!sortAscending);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConvertClick = () => {
    const rate = currencyRates[selectedCurrency].rate_float;
    setResult(sortAscending ? amount / rate : rate * amount);
  };

  const sortedRates =
    currencyRates &&
    Object.entries(currencyRates).sort(([, a], [, b]) =>
      sortAscending ? a.rate_float - b.rate_float : b.rate_float - a.rate_float
    );

  return (
    <div>
      <label htmlFor="search">
        Currency:
        <select value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </label>

      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <button className="convert" onClick={handleConvertClick}>
        <a
          href="#_"
          className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative">Convert</span>
        </a>
      </button>
      <br />
      {result && (
        <div className="convert">
          {amount} {selectedCurrency} = {result.toFixed(8)} BTC
        </div>
      )}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {sortedRates && (
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Currency
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRates.map(([currency, { rate, rate_float }]) => (
                      <>
                        <tr
                          key={currency}
                          className="border-b dark:border-neutral-500"
                        >
                          <>
                            <td className="whitespace-nowrap px-6 py-4">
                              ({currency})
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              ({currency}) {rate} Per BTC
                            </td>
                          </>
                        </tr>
                        <tr className="border-b dark:border-neutral-500"></tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="sort " onClick={handleSortClick}>
        <a
          href="#_"
          className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-bloc"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative">Sort Currency</span>
        </a>
        {sortAscending ? "(Descending)" : "(Ascending)"}
      </button>
      <br />
    </div>
  );
}
export default Conversions;
