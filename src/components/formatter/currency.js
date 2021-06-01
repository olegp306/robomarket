export const Currency = (value, currency = 'RUB') => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(parseFloat(value));
};
