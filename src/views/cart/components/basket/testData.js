const testData = [
  {
    store_id: 'Atlantic Energy',
    products: [
      {
        img: '/assets/picture.png',
        description: 'Аккумулятор C41N1531 для Asus GL502VY 4020mAh 62Wh Оригинал ASUS',
        delivery: 'Курьер',
        deliveryPrice: '550,00',
        location: 'по Москве',
        deliveryPlace: 'доставка до двери',
        price: '5,000',
        sum: '574,00',
        oldPrice: '',
        currency: '₽',
        currencyPrice: '₽',
        isDiscount: false,
        isUnavailable: false,
      },
      {
        img: '/assets/picture.png',
        description: 'Аккумулятор Samsung INR18650-29E 2900mAh 8,25A 18650 Li-ion',
        delivery: 'Курьер',
        deliveryPrice: '550,00',
        location: 'по Москве',
        deliveryPlace: 'доставка до двери',
        price: '250,00',
        sum: '250,00',
        oldPrice: '',
        currency: '₽',
        currencyPrice: '₽',
        isDiscount: false,
        isUnavailable: false,
      },
      {
        img: '/assets/picture.png',
        description: 'Датчик помощи педалированию PAS (Pedal Assist Sensor)',
        delivery: 'Курьер',
        deliveryPrice: '550,00',
        location: 'по Москве',
        deliveryPlace: 'доставка до двери',
        price: '750,00',
        sum: '750,00',
        oldPrice: '',
        currency: '₽',
        currencyPrice: '₽',
        isDiscount: false,
        isUnavailable: false,
      },
    ],
    price: 2000,
    total: 6300,
    deliveryPlace: 'доставка до двери',
    deliveryPrice: '550,00',
    location: 'по Москве',
    currencyPrice: '₽',
    currency: '₽',
  },
  {
    store_id: 'Манометр',
    products: [
      {
        _id: '123',
        img: '/picture.png',
        company: 'Flapru.ru',
        description: "Манометр Watts 10008095, аксиальный, Дк 63 мм, 0,6 МПа, наружная резьба 1,4'",
        delivery: 'Почта',
        deliveryPrice: '400,00',
        location: '',
        deliveryPlace: '',
        price: '378,00',
        sum: '778,00',
        oldPrice: '',
        currency: '₽',
        currencyPrice: '₽',
        isDiscount: false,
        isUnavailable: true,
      },
    ],
    price: 778,
    total: 778,
    deliveryPlace: 'доставка до двери',
    deliveryPrice: '550,00',
    location: 'по Москве',
    currencyPrice: '₽',
    currency: '₽',
  },
];

export default testData;
// export default {testDataGoods};
