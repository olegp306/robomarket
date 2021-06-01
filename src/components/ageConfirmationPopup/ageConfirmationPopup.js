import React from 'react';

import { StorefrontPopup } from '@robokassa/robomarket-components';

const AgeConfirmationPopup = ({ onSubmit, onDeny, onClose }) => {
  return (
    <StorefrontPopup
      title="Подтвердите возраст"
      primaryButtonText="Мне есть 18"
      secondaryButtonText="Мне нет 18"
      primaryButtonHandler={onSubmit}
      secondaryButtonHandler={onDeny}
      closeButtonHandler={onClose}
    >
      Пожалуйста, подтвердите свой возраст, чтобы просмотреть товары для взрослых.
    </StorefrontPopup>
  );
};

export default AgeConfirmationPopup;
