import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("BTC");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toCurrency, setToCurrency] = React.useState("USDT");
  const [toPrice, setToPrice] = React.useState(1);
  const [rates, setRates] = React.useState({});

  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch(
      "http://api.coinlayer.com/api/live?access_key=fc057f247e9c26e5ca1f3c335b9bf92a"
    )
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const res = price * ratesRef.current[toCurrency];
    setToPrice(res.toFixed(6));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const price = value / ratesRef.current[toCurrency];
    const res = price * ratesRef.current[fromCurrency];
    setToPrice(value);
    setFromPrice(res.toFixed(6));
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice); // TODO: onChangeFromPrice
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
