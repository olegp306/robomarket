import React, { useEffect, useState } from 'react';
import { Checkbox } from '@robokassa/robomarket-components';
import SVG from 'react-inlinesvg';
import styles from './styles.scss';
import { Col, Row } from '../../../../components/grid/grid';
import { Currency } from '../../../../components/formatter/currency';
import marked from './marked.svg';

const mapDelivery = {
  courier: 'Курьер',
  pickup: 'Доставка самовывозом',
  post: 'Доставка почтой',
  email: 'Электронная доставка',
};

const ZoneDeliveryItem = ({ zone, isChecked, onClickZone, currency }) => (
  <Row key={zone.zone} className={styles.deliveryZones} onClick={onClickZone}>
    <Col sm={1} className={styles.svgWrapper}>
      {isChecked && <SVG className={styles.svg} src={marked} />}
    </Col>
    <Col sm={9}>
      <div>{`${zone.city}: ${zone.zone}`}</div>
      <div className={styles.deliveryDescriptionZone}>{zone.description}</div>
    </Col>
    <Col sm={2} className={styles.deliveryCost}>
      <span>{Currency(zone.cost, currency)}</span>
    </Col>
  </Row>
);

const DeliverySelector = ({
  currentLocationCode,
  availableDelivery,
  onChangeType,
  onChangeZone,
  currency,
}) => {
  const [checkedTypeDelivery, setTypeDelivery] = useState();
  const [checkedZone, setCheckedZone] = useState();
  const [
    isPostDeliveryForCurrentLocationExists,
    setIsPostDeliveryForCurrentLocationExists,
  ] = useState(false);

  const onChangeDeliveryZoneData = (val) => {
    setCheckedZone(val);
    onChangeZone(val);
  };

  const onChangeDeliveryData = (val) => {
    setTypeDelivery(val);
    onChangeType(val);
    onChangeDeliveryZoneData(undefined);
  };

  useEffect(() => {
    if (checkedTypeDelivery && !checkedZone) {
      const checkedDelivery = availableDelivery.filter((item) => item._id === checkedTypeDelivery);
      if (checkedDelivery.length > 0 && checkedDelivery[0].zones) {
        setCheckedZone(checkedDelivery[0].zones[0]._id);
        onChangeZone(checkedDelivery[0].zones[0]._id);
      }
    }
  }, [checkedTypeDelivery]);

  const availableDeliveriesInRegion = availableDelivery.filter(
    (item) =>
      !item.region ||
      currentLocationCode === item.region ||
      (!isPostDeliveryForCurrentLocationExists && item.region === 'RU'),
  );

  const setEmailDeliveryIfPossible = () => {
    if (availableDeliveriesInRegion.length > 0) {
      const emailDelivery = availableDelivery.find((delivery) => delivery.type_name === 'email');
      if (emailDelivery) {
        onChangeDeliveryData(emailDelivery._id);
        onChangeDeliveryZoneData(undefined);
      }
    }
  };

  useEffect(() => {
    const tmpAvailableDeliveries = availableDelivery.filter(
      (item) => item.type_name === 'post' && item.region === currentLocationCode,
    );
    if (tmpAvailableDeliveries.length > 0) {
      setIsPostDeliveryForCurrentLocationExists(true);
    } else {
      setIsPostDeliveryForCurrentLocationExists(false);
    }
    setEmailDeliveryIfPossible();
  }, [currentLocationCode, availableDelivery]);

  return (
    <div className={styles.deliverySelectorWrapper}>
      {availableDeliveriesInRegion.map((item) => (
        <div key={item.type_name} className={styles.deliveryType}>
          <Checkbox
            key={item._id}
            name={item.type_name}
            value={item._id}
            checked={item._id === checkedTypeDelivery}
            type="radio"
            onChange={(el) => onChangeDeliveryData(el.target.value)}
            label={mapDelivery[item.type_name]}
            className={styles.checkBox}
          />
          {item.description && (
            <span className={styles.deliveryDescription}>{item.description}</span>
          )}
          {item.zones && checkedTypeDelivery === item._id && (
            <div style={{ margin: '5px' }}>
              {item.zones.map((zone) => (
                <ZoneDeliveryItem
                  key={zone._id}
                  zone={zone}
                  isChecked={checkedZone === zone._id}
                  onClickZone={() => onChangeDeliveryZoneData(zone._id)}
                  currency={currency}
                />
              ))}
            </div>
          )}
          {!item.zones && checkedTypeDelivery === item._id && (
            <div className={styles.deliveryRegionCost}>{Currency(item.cost, item.currency)}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeliverySelector;
