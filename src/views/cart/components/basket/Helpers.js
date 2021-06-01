export function countAmount(products) {
  if (products.length > 0) {
    return products.map((item) => item.price * item.count).reduce((a, b) => a + b);
  } else {
    return 0;
  }
}

export function countDelivery(products) {
  const deliveries = {};
  // eslint-disable-next-line array-callback-return
  products.map((item) => {
    const deliveryId = item.delivery.zone_id || item.delivery.type_id;
    if (deliveries[deliveryId] === undefined) {
      deliveries[deliveryId] = parseFloat(item.delivery.cost);
    }
  });
  const deliveryValues = Object.values(deliveries);

  if (deliveryValues.length > 0) {
    return deliveryValues.reduce((a, b) => a + b);
  } else {
    return 0;
  }
}
