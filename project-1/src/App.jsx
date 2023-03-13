import { useState, useEffect } from "react";
import "./App.css";
import CurrencyConversionRates from "./components/CurrencyConversionRates";
import Conversions from "./components/Conversions";
import axios from "axios";

function App() {
  const [componentToShow, setComponentToShow] = useState("filter");
  const [lastRefreshedTime, setLastRefreshedTime] = useState(null);
  const [refreshDisabled, setRefreshDisabled] = useState(true);
  const [dataDate, setDataDate] = useState(null);
  const fetchData = () => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        setDataDate(response.data.time.updated);
        setLastRefreshedTime(new Date().toLocaleString());
        setRefreshDisabled(true);
        setTimeout(() => setRefreshDisabled(), 5 * 60 * 1000);
      })
      .catch((error) => console.log(error));
  };

  const refetchData = () => {
    const lastRefreshTime = localStorage.getItem("fiveMinutesRefresh");
    const time = Date.now();

    if (!lastRefreshTime || time - lastRefreshTime > 5 * 60 * 1000) {
      localStorage.setItem("fiveMinutesRefresh", time);
    } else {
      alert(`You can only refresh the page every 5 minutes`);
      return false;
    }

    return true;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  const CurrencyConversionHandler = () => {
    setComponentToShow("currency-conversion");
  };

  const ConversionsHandler = () => {
    setComponentToShow("conversions");
  };

  return (
    <div className="App w-[50%] mx-auto py-5">
      <nav className="flex justify-center gap-5">
        <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6 w-full">
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            <img
              className="h-8 w-8 mr-2"
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg"
              alt="Bitcoin logo"
            />
            <span class="font-semibold text-xl tracking-tight">
              Crypto Bank
            </span>
          </div>
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="https://cryptologos.cc/logos/bitcoin-btc-logo.svg"
              >
                <title></title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
              <button
                onClick={CurrencyConversionHandler}
                className="relative inline-block text-lg group"
              >
                <a
                  href="#_"
                  className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md w-full"
                >
                  <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                  <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400 w-full">
                    <span className="relative text-white">
                      Currency Conversion Rates
                    </span>
                  </span>
                </a>
              </button>
            </div>
            <div>
              <button
                onClick={ConversionsHandler}
                className="relative inline-block text-lg group w-full"
              >
                <a
                  href="#_"
                  className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md w-full"
                >
                  <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                  <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400 w-full">
                    <span className="relative text-white">
                      Show Conversions
                    </span>
                  </span>
                </a>
              </button>
            </div>
          </div>
        </nav>
      </nav>

      <section className="py-5">
        {componentToShow === "currency-conversion" && (
          <CurrencyConversionRates />
        )}
        {componentToShow === "conversions" && <Conversions />}
      </section>
      <div className="flex justify-between mb-2">
        <div id="date" className="text-sm font-medium text-gray-500">
          API Date: {formatTime(dataDate)}
        </div>
        <div id="date" className="div-1 text-sm font-medium text-gray-500">
          Last Refreshed: {lastRefreshedTime}
        </div>
        <button onClick={refetchData}>
          <a
            href="#_"
            class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
          >
            <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
            <span class="relative z-20 flex items-center text-sm">
              <svg
                class="relative w-5 h-5 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Refresh
            </span>
          </a>
        </button>
      </div>
    </div>
  );
}

export default App;
