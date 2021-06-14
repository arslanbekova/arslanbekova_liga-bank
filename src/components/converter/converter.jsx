import React, {useState} from 'react';
import Form from '../form/form';
import ExchangeHistory from '../exchange-history/exchange-history';

const Converter = () => {
  const [exchangesHistory, setExchangesHistory] = useState([]);

  return (
    <article className="converter">
      <Form saveResult={setExchangesHistory} results={exchangesHistory}/>
      <ExchangeHistory clearResults={setExchangesHistory} results={exchangesHistory}/>
    </article>
  );
};

export default Converter;
