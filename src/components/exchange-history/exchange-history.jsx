import React from 'react';

const ExchangeHistory = () => {
  return (
    <section className="exchange-history">
      <div className="exchange-history__wrapper">
        <h2 className="exchange-history__title">История конвертации</h2>
        <ul className="exchange-history__list">
          <li className="exchange-history__item">
            <span className="exchange-history__option exchange-history__option--date">25.11.2020</span>
            <span className="exchange-history__option exchange-history__option--amount-from">1000 RUB</span>
            <span className="exchange-history__option exchange-history__option--amount-to">13,1234 USD</span>
          </li>
        </ul>
        <button className="button button--clear" type="button">Очистить историю</button>
      </div>
    </section>
  );
};

export default ExchangeHistory;
