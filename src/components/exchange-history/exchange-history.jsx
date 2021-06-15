import React from 'react';
import PropTypes from 'prop-types';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const ExchangeHistory = ({clearResults, results}) => {
  const MAX_ID_SYMBOLS = 5;

  const handleButtonClearClick = () => {
    const minResultsLength = 0;
    results.length = minResultsLength;
    clearResults([...results]);
  };

  return (
    <section className="exchange-history">
      <div className="exchange-history__wrapper">
        <h2 className="exchange-history__title">История конвертации</h2>
        <ul className="exchange-history__list">
          {!results.length ? `` : results.map((result) =>
            <li className="exchange-history__item" key={nanoid(MAX_ID_SYMBOLS)}>
              <span className="exchange-history__option exchange-history__option--date">{dayjs(result.currentDate).format(`DD.MM.YYYY`)}</span>
              <span className="exchange-history__option exchange-history__option--amount-from">{result.avaliableAmount} {result.avaliableCurrency}</span>
              <span className="exchange-history__option exchange-history__option--amount-to">{result.wantedAmount} {result.wantedCurrency}</span>
            </li>
          )}
        </ul>
        <button className="button button--clear" type="button" onClick={handleButtonClearClick} disabled={!results.length ? true : false}>Очистить историю</button>
      </div>
    </section>
  );
};

ExchangeHistory.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    avaliableAmount: PropTypes.number.isRequired,
    wantedAmount: PropTypes.number.isRequired,
    currentDate: PropTypes.string.isRequired,
    avaliableCurrency: PropTypes.string.isRequired,
    wantedCurrency: PropTypes.string.isRequired,
  })),
  clearResults: PropTypes.func.isRequired,
};

export default ExchangeHistory;
