import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function CurrencyConversionRates() {
  const [usdRate, setUsdRate] = useState(null);
  const [eurRate, setEurRate] = useState(null);
  const [gbpRate, setGbpRate] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        setUsdRate(response.data.bpi.USD.rate);
        setEurRate(response.data.bpi.EUR.rate);
        setGbpRate(response.data.bpi.GBP.rate);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <section id="current-conversions-rates"></section>

      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      #
                    </th>
                    <th scope="col" class="px-6 py-4">
                      $ (USD) to BTC
                    </th>
                    <th scope="col" class="px-6 py-4">
                      1 (BTC) to $
                    </th>
                    <th scope="col" class="px-6 py-4">
                      € (EUR) to BTC
                    </th>
                    <th scope="col" class="px-6 py-4">
                      1 (BTC) to €
                    </th>
                    <th scope="col" class="px-6 py-4">
                      £ (GBP) to BTC
                    </th>
                    <th scope="col" class="px-6 py-4">
                      1 (BTC) to £
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:border-neutral-500">
                    {usdRate && (
                      <>
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          1
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          $1 = {(0.001 / parseFloat(usdRate)).toFixed(8)} BTC
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          1 BTC = ${usdRate}
                        </td>
                      </>
                    )}

                    {eurRate && (
                      <>
                        <td class="whitespace-nowrap px-6 py-4">
                          €1 = {(0.001 / parseFloat(eurRate)).toFixed(8)} BTC
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          1 BTC = €{eurRate}
                        </td>
                      </>
                    )}
                    {gbpRate && (
                      <>
                        <td class="whitespace-nowrap px-6 py-4">
                          £1 = {(0.001 / parseFloat(gbpRate)).toFixed(8)} BTC
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          1 BTC = £{gbpRate}
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
              <h1 className="arrow">➠</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConversionRates;
