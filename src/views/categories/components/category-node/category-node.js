import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Col } from '../../../../components/grid/grid';

import styles from './styles.scss';
import { callFetchApi } from '../../../../services/asyncApiFetch';

const NodeItem = ({ nodeItem, className, onItemClick }) => {
  return (
    <div
      className={className}
      role="button"
      onClick={() => onItemClick(nodeItem._id)}
      onKeyDown={() => onItemClick(nodeItem._id)}
      tabIndex={-1}
    >
      {nodeItem.name}
    </div>
  );
};

const CategoryNode = ({ node }) => {
  const history = useHistory();
  const [children, setChildren] = useState(null);

  const getNodeChildren = (nodeId) => {
    const url = '/category/nodes';
    const query = { category_id: nodeId };
    callFetchApi({ url, query }, { method: 'get' }).then(({ data, error }) => {
      if (!error) {
        setChildren(data.items);
      }
    });
  };

  useEffect(() => {
    node && node._id && getNodeChildren(node._id);
  }, [node]);

  const onCategorySelect = (nodeId) => {
    history.push({
      pathname: '/catalog',
      search: `?category=${nodeId}`,
    });
  };

  return (
    <Col sm={3} className={styles.wrapper}>
      <NodeItem
        className={styles.nodeRoot}
        nodeItem={node}
        onItemClick={() => onCategorySelect(node._id)}
      />
      {children &&
        children.map((item) => (
          <NodeItem
            key={item._id}
            className={styles.nodeChild}
            nodeItem={item}
            onItemClick={() => onCategorySelect(item._id)}
          />
        ))}
    </Col>
  );
};

export default CategoryNode;
