import React from 'react';

const Footer = () => {
  const SocialListSettings = {
    FACEBOOK: {
      title: `Мы на фейсбук`,
      iconId: `facebook`,
    },
    INSTAGRAM: {
      title: `Мы в инстаграм`,
      iconId: `instagram`,
    },
    TWITTER: {
      title: `Мы в твиттере`,
      iconId: `twitter`,
    },
    YOUTUBE: {
      title: `Мы на ютуб`,
      iconId: `youtube`,
    },
  };
  const FooterMenuSettings = {
    SERVICE: {
      title: `Услуги`,
      path: `services.html`,
    },
    CREDIT: {
      title: `Рассчитать кредит`,
      path: `credit.html`,
    },
    CONTACT: {
      title: `Контакты`,
      path: `contacts.html`,
    },
    QUESTION: {
      title: `Задать вопрос`,
      path: `question.html`,
    },
  };

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="logo footer__logo-wrapper">
          <img className="logo__image" src="./img/logo.svg" width="28" height="25" alt="Логотип Лига Банк"/> <span className="logo__text">ЛИГА Банк</span>
        </div>
        <p className="footer__contacts footer__contacts--address">
          150015, г. Москва, ул. Московская, д. 32
          Генеральная лицензия Банка России №1050
          Ⓒ Лига Банк, 2019
        </p>
        <ul className="footer__nav">
          {Object.values(FooterMenuSettings).map((menuItem) =>
            <li className="footer__nav-item" key={menuItem.title}>
              <a href={menuItem.path}>{menuItem.title}</a>
            </li>
          )}
        </ul>
        <div className="footer__contacts footer__contacts--message">
          <p className="footer__number">*0904</p>
          <p className="footer__intro">Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</p>
        </div>
        <div className="footer__contacts footer__contacts--phone">
          <p className="footer__number">8 800 111 22 33</p>
          <p className="footer__intro">Бесплатный для всех городов России</p>
        </div>
        <ul className="footer__social social-list">
          {Object.values(SocialListSettings).map((socialItem) =>
            <li className="social-list__item" key={socialItem.iconId}>
              <a className="social-list__link" href="#">
                <span className="visually-hidden">{socialItem.title}</span>
                <svg className={`social-list__icon footer__icon footer__icon--${socialItem.iconId}`} width="9" height="16" aria-hidden="true">
                  <use xlinkHref={`./img/sprite-manual.svg#icon-${socialItem.iconId}`}></use>
                </svg>
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
