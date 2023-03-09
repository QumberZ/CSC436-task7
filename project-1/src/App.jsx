import { useState } from "react";
import "./App.css";
import CurrencyConversionRates from "./components/CurrencyConversionRates";
import Conversions from "./components/Conversions";

function App() {
  const [componentToShow, setComponentToShow] = useState("filter");

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
    </div>
  );
}

export default App;
