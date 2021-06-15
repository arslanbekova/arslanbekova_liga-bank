import React, {useState} from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {createAPI} from "../../api";

const api = createAPI();

const Form = ({saveResult, results}) => {
  const CURRENCIES = [
    `RUB`,
    `USD`,
    `EUR`,
    `GBP`,
    `CNY`,
  ];

  const Breakpoints = {
    MIN_AMOUNT_FIELD_VALUE: 1,
    MAX_DAYS_GAP: 7,
    MAX_HISTORY_RESULTS_COUNT: 10,
  };

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
  const [isDisableButton, setDisableButton] = useState(true);

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
    })
    .catch((error) => error);
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
    setDisableButton(false);
    if (amount < Breakpoints.MIN_AMOUNT_FIELD_VALUE) {
      copyUserForm.avaliableAmount = DEFAULT_USER_FORM.avaliableAmount;
      copyUserForm.wantedAmount = DEFAULT_USER_FORM.wantedAmount;
      setUserForm({...copyUserForm});
      setDisableButton(true);
      return;
    }
    convertAvaliableToWanted(amount);
  };

  const handleWantedAmountChange = (evt) => {
    const amount = Number(evt.target.value);
    setDisableButton(false);
    if (amount < Breakpoints.MIN_AMOUNT_FIELD_VALUE) {
      copyUserForm.wantedAmount = DEFAULT_USER_FORM.avaliableAmount;
      copyUserForm.avaliableAmount = DEFAULT_USER_FORM.wantedAmount;
      setUserForm({...copyUserForm});
      setDisableButton(true);
      return;
    }
    convertWantedToAvaliable(amount);
  };

  const minDate = dayjs(new Date()).subtract(Breakpoints.MAX_DAYS_GAP, `day`).format(`YYYY-MM-DD`);
  const maxDate = dayjs(new Date()).format(`YYYY-MM-DD`);

  const handleDateChange = (evt) => {
    copyUserForm.currentDate = dayjs(evt.target.value).format(`YYYY-MM-DD`);
    setUserForm({...copyUserForm});
    if (userForm.avaliableAmount === `` || userForm.wantedAmount === ``) {
      return;
    }
    convertCurrency(userForm.avaliableAmount, userForm.avaliableCurrency, userForm.wantedCurrency, userForm.currentDate)
    .then((data) => {
      copyUserForm.wantedAmount = data.rates[userForm.wantedCurrency];
      setUserForm({...copyUserForm});
    });
  };

  const handleButtonSaveClick = () => {
    if (results.length === Breakpoints.MAX_HISTORY_RESULTS_COUNT) {
      results.pop();
    }
    results.unshift({...userForm});
    saveResult([...results]);
  };

  return (
    <form className="form">
      <h2 className="form__title">Конвертер валют</h2>
      <fieldset className="form__field form__field--is-avaliable">
        <h3 className="form__field-title">У меня есть</h3>
        <input className="form__input form__input--number" type="number" value={userForm.avaliableAmount} min={Breakpoints.MIN_AMOUNT_FIELD_VALUE} id="is-available" name="is-available" placeholder="1000"
          onChange={handleAvaliableAmountChange}/>
        <select className="form__option" onChange={handleAvaliableCurrencyChange} defaultValue={DEFAULT_USER_FORM.avaliableCurrency}>
          {CURRENCIES.map((currency) => <option value={currency} key={currency}>{currency}</option>)}
        </select>
      </fieldset>
      <fieldset className="form__field form__field--wanted">
        <h3 className="form__field-title">Хочу приобрести</h3>
        <input className="form__input form__input--number" type="number" value={userForm.wantedAmount} min={Breakpoints.MIN_AMOUNT_FIELD_VALUE} id="wanted" name="wanted" placeholder="1000" onChange={handleWantedAmountChange}/>
        <select className="form__option" onChange={handleWantedCurrencyChange} defaultValue={DEFAULT_USER_FORM.wantedCurrency}>
          {CURRENCIES.map((currency) => <option value={currency} key={currency}>{currency}</option>)}
        </select>
      </fieldset>
      <fieldset className="form__field">
        <label className="visually-hidden" htmlFor="exchange-date">Желаемая дата обмена</label>
        <input className="form__input form__input--exchange-date" id="exchange-date" type="date" name="exchange-date"
          required value={userForm.currentDate} min={minDate} max={maxDate} onChange={handleDateChange}/>
      </fieldset>
      <button className="button button--save" type="button" onClick={handleButtonSaveClick} disabled={isDisableButton}>Сохранить результат</button>
    </form>
  );
};

Form.propTypes = {
  saveResult: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
};

export default Form;
