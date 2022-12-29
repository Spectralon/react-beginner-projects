import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("BTC");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toCurrency, setToCurrency] = React.useState("USDT");
  const [toPrice, setToPrice] = React.useState(0);
  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch(
      "http://api.coinlayer.com/api/live?access_key=fc057f247e9c26e5ca1f3c335b9bf92a"
    )
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const res = price * rates[toCurrency];
    setToPrice(res);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const price = value / rates[toCurrency];
    const res = price * rates[fromCurrency];
    setToPrice(value);
    setFromPrice(res);
  };

  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur);
    onChangeFromPrice(fromPrice);
  };

  const onChangeToCurrency = (cur) => {
    setToCurrency(cur);
    onChangeToPrice(toPrice);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={onChangeFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={onChangeToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
