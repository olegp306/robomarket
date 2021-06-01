import React, { useState } from 'react';
import PopupWindow from '../../popupWindow/PopupWindow';
import CatalogMenu from '../../catalogMenu';

const BurgerPopup = () => {
  const [visibility, setVisibility] = useState(false);
  return (
    <PopupWindow isVisible={visibility} onClose={() => setVisibility(false)}>
      <CatalogMenu />
    </PopupWindow>
  );
};

export default BurgerPopup;
