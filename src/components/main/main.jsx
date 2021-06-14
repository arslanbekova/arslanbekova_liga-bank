import React from 'react';
import Promo from '../promo/promo';
import Form from '../form/form';
import ExchangeHistory from '../exchange-history/exchange-history';

const Main = () => {
  return (
    <main>
      <Promo/>
      <Form/>
      <ExchangeHistory/>
    </main>
  );
};

export default Main;
