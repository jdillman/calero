import React from 'react';

export default function ItemScreen(props) {
  const itemId = props.match.params.itemId;
  return <span>Item: {itemId}</span>;
}
