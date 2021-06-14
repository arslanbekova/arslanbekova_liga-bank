import React from 'react';
import Form from '../form/form';
import ExchangeHistory from '../exchange-history/exchange-history';

const Converter = () => {
  return (
    <article className="converter">
      <Form/>
      <ExchangeHistory/>
    </article>
  );
};

export default Converter;
