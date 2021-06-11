import React from 'react';

const Form = () => {
  const currencies = [
    `RUB`,
    `USD`,
    `EUR`,
    `GBR`,
    `CNY`,
  ];

  return (
    <form className="form">
      <div className="form__wrapper">
        <h2 className="form__title">Конвертер валют</h2>
        <fieldset className="form__field form__field--is-avaliable">
          <h3 className="form__field-title">У меня есть</h3>
          <input className="form__input form__input--number" type="number" id="is-available" name="is-available" placeholder="1000"/>
          <select className="form__option">
            {currencies.map((currency) => <option value={currency} key={currency}>{currency}</option>)}
          </select>
        </fieldset>
        <fieldset className="form__field form__field--wanted">
          <h3 className="form__field-title">Хочу приобрести</h3>
          <input className="form__input form__input--number" type="number" id="wanted" name="wanted" placeholder="1000"/>
          <select className="form__option">
            {currencies.map((currency) => <option value={currency} key={currency}>{currency}</option>)}
          </select>
        </fieldset>
        <fieldset className="form__field">
          <label className="visually-hidden" htmlFor="exchange-date">Желаемая дата обмена</label>
          <input className="form__input form__input--exchange-date" id="exchange-date" type="date" name="exchange-date"
            required/>
        </fieldset>
        <button className="button button--save" type="button">Сохранить результат</button>
      </div>
    </form>
  );
};

export default Form;
