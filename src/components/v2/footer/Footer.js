import React from 'react';
import s from './styles.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footerTitle}>Остались вопросы?</div>
        <div className={s.footerSubTitle}>Свяжитесь удобным способом</div>
        <div className={s.contacts} id="contacts">
          <div className={s.contact}>
            <div className={s.contactLabel}>Телефон:</div>
            <a href="tel:+74954501582" className={s.contactLink}>
              +7 495 450-15-82
            </a>
          </div>
          <div className={s.contact}>
            <div className={s.contactLabel}> Электронная почта:</div>
            <a href="mailto:support@amaron.ru " className={s.contactLink}>
              support@amaron.ru
            </a>
          </div>
        </div>
        <div className={s.copyrightWrapper}>
          <span className={s.copyright}>© 2020. Все права защищены.</span>
          <div className={s.publicOffer}>
            <a
              href="https://docs.robo.market/media/1506/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5_%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BB%D0%BA_%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%B0%D1%82%D0%B5%D0%BB%D1%8F.pdf"
              className={s.copyrightLink}
            >
              Публичная оферта
            </a>
          </div>
          <div className={s.publicOffer}>
            <span className={s.whiteText}>Сделано</span>
            <a
              href="https://insta.robo.market/?_ga=2.207975186.1050325554.1590396282-433838939.1584601103"
              className={s.copyrightLink}
            >
              &nbsp;на Robo.Market
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
