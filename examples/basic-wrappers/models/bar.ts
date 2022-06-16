import React from 'react';

export default function () {
  const [count, setCount] = React.useState(10);
  return {
    description: count,
    setCount,
  };
}
