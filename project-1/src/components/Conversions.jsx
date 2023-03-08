import React, { useState, useEffect } from "react";
import axios from "axios";

function Conversions() {
  const [rates, setRates] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => setRates(response.data.bpi))
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
    const rate = rates[selectedCurrency].rate_float;
    setResult(sortAscending ? amount / rate : rate * amount);
  };

  const sortedRates =
    rates &&
    Object.entries(rates).sort(([, a], [, b]) =>
      sortAscending ? a.rate_float - b.rate_float : b.rate_float - a.rate_float
    );

  return (
    <div>
      <button onClick={handleSortClick}>
        {sortAscending ? "Sort Descending" : "Sort Ascending"}
      </button>
      <br />

      <label htmlFor="search">
        Currency:
        <select value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </label>
      <br />
      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <button onClick={handleConvertClick}>
        <a
          href="#_"
          class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block"
        >
          <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span class="relative">Convert</span>
        </a>
      </button>
      <br />
      {result && (
        <div>
          {amount} {selectedCurrency} = {result.toFixed(8)} BTC
        </div>
      )}
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              {sortedRates && (
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        Currency
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRates.map(([currency, { rate, rate_float }]) => (
                      <>
                        <tr
                          key={currency}
                          class="border-b dark:border-neutral-500"
                        >
                          <>
                            <td class="whitespace-nowrap px-6 py-4">
                              ({currency})
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                              {rate} ({rate_float})
                            </td>
                          </>
                        </tr>
                        <tr class="border-b dark:border-neutral-500"></tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Conversions;
