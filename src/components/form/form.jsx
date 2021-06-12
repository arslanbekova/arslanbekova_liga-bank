import React, {useState} from 'react';
import dayjs from 'dayjs';
import {createAPI} from "../../api";

const api = createAPI();

const Form = () => {
  const CURRENCIES = [
    `RUB`,
    `USD`,
    `EUR`,
    `GBP`,
    `CNY`,
  ];

  const MAX_DAYS_GAP = 7;

  const MIN_AMOUNT_FIELD_VALUE = 1;

  const defaultCurrencies = {
    AVALIABLE: `RUB`,
    WANTED: `USD`,
  };

  const DEFAULT_USER_FORM = {
    avaliableAmount: ``,
    wantedAmount: ``,
    currentDate: dayjs(new Date()).format(`YYYY-MM-DD`),
    avaliableCurrency: defaultCurrencies.AVALIABLE,
    wantedCurrency: defaultCurrencies.WANTED,
  };

  const [userForm, setUserForm] = useState(DEFAULT_USER_FORM);

  let copyUserForm = userForm;

  const convertCurrency = (amount, currencyFrom, currencyTo, date) => {
    return api.get(`/${date}?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`)
    .then((response) => response.data);
  };

  const convertAvaliableToWanted = (amount) => {
    convertCurrency(amount, userForm.avaliableCurrency, userForm.wantedCurrency, userForm.currentDate)
    .then((data) => {
      copyUserForm.wantedAmount = data.rates[userForm.wantedCurrency];
      copyUserForm.avaliableAmount = amount;
      setUserForm({...copyUserForm});
    })
    .catch((error) => error);
  };

  const convertWantedToAvaliable = (amount) => {
    convertCurrency(amount, userForm.wantedCurrency, userForm.avaliableCurrency, userForm.currentDate)
    .then((data) => {
      copyUserForm.avaliableAmount = data.rates[userForm.avaliableCurrency];
      copyUserForm.wantedAmount = amount;
      setUserForm({...copyUserForm});
    });
  };

  const handleAvaliableCurrencyChange = (evt) => {
    copyUserForm.avaliableCurrency = evt.target.value;
    setUserForm({...copyUserForm});
    convertAvaliableToWanted(userForm.avaliableAmount);
  };

  const handleWantedCurrencyChange = (evt) => {
    copyUserForm.wantedCurrency = evt.target.value;
    setUserForm({...copyUserForm});
    convertAvaliableToWanted(userForm.avaliableAmount);
  };

  const handleAvaliableAmountChange = (evt) => {
    const amount = Number(evt.target.value);
    if (amount < MIN_AMOUNT_FIELD_VALUE) {
      setUserForm({...DEFAULT_USER_FORM});
      return;
    }
    convertAvaliableToWanted(amount);
  };

  const handleWantedAmountChange = (evt) => {
    const amount = Number(evt.target.value);
    if (amount < MIN_AMOUNT_FIELD_VALUE) {
      setUserForm({...DEFAULT_USER_FORM});
      return;
    }
    convertWantedToAvaliable(amount);
  };

  const minDate = dayjs(new Date()).subtract(MAX_DAYS_GAP, `day`).format(`YYYY-MM-DD`);

  const handleDateChange = (evt) => {
    copyUserForm.currentDate = dayjs(evt.target.value).format(`YYYY-MM-DD`);
    setUserForm({...copyUserForm});
    convertCurrency(userForm.avaliableAmount, userForm.avaliableCurrency, userForm.wantedCurrency, userForm.currentDate)
    .then((data) => {
      copyUserForm.wantedAmount = data.rates[userForm.wantedCurrency];
      setUserForm({...copyUserForm});
    });
  };

  return (
    <form className="form">
      <div className="form__wrapper">
        <h2 className="form__title">Конвертер валют</h2>
        <fieldset className="form__field form__field--is-avaliable">
          <h3 className="form__field-title">У меня есть</h3>
          <input className="form__input form__input--number" type="number" value={userForm.avaliableAmount} min={MIN_AMOUNT_FIELD_VALUE} id="is-available" name="is-available" placeholder="1000"
            onChange={handleAvaliableAmountChange}/>
          <select className="form__option" onChange={handleAvaliableCurrencyChange} defaultValue={DEFAULT_USER_FORM.avaliableCurrency}>
            {CURRENCIES.map((currency) => <option value={currency} key={currency}>{currency}</option>)}
          </select>
        </fieldset>
        <fieldset className="form__field form__field--wanted">
          <h3 className="form__field-title">Хочу приобрести</h3>
          <input className="form__input form__input--number" type="number" value={userForm.wantedAmount} min={MIN_AMOUNT_FIELD_VALUE} id="wanted" name="wanted" placeholder="1000" onChange={handleWantedAmountChange}/>
          <select className="form__option" onChange={handleWantedCurrencyChange} defaultValue={DEFAULT_USER_FORM.wantedCurrency}>
            {CURRENCIES.map((currency) => <option value={currency} key={currency}>{currency}</option>)}
          </select>
        </fieldset>
        <fieldset className="form__field">
          <label className="visually-hidden" htmlFor="exchange-date">Желаемая дата обмена</label>
          <input className="form__input form__input--exchange-date" id="exchange-date" type="date" name="exchange-date"
            required value={userForm.currentDate} min={minDate} onChange={handleDateChange}/>
        </fieldset>
        <button className="button button--save" type="button">Сохранить результат</button>
      </div>
    </form>
  );
};

export default Form;
