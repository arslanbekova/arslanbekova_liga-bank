import React from 'react';

const Header = () => {
  const SiteMenuSettings = {
    SERVICE: {
      title: `Услуги`,
      path: `services.html`,
    },
    CREDIT: {
      title: `Рассчитать кредит`,
      path: `credit.html`,
    },
    CONVERTER: {
      title: `Конвертер валют`,
      path: `converter.html`,
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
    <header className="header">
      <div className="header__wrapper">
        <div className="logo header__logo-wrapper">
          <img className="logo__image" src="./img/logo.svg" width="28" height="25" alt="Логотип Лига Банк"/> <span className="logo__text">ЛИГА Банк</span>
        </div>
        <nav className="header__navigation navigation">
          <ul className="navigation__list site-list">
            {Object.values(SiteMenuSettings).map((menuItem) =>
              <li className="site-list__item" key={menuItem.title}>
                <a href={menuItem.path}
                  className={`site-list__link ${menuItem.title === SiteMenuSettings.CONVERTER.title ? `site-list__link--active` : ``}`}>
                  {menuItem.title}
                </a>
              </li>
            )}
          </ul>
          <ul className="navigation__list user-list">
            <li className="user-list__item">
              <a className="user-list__link user-list__link--login" href="login.html">Войти в Интернет-банк</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
