import React from 'react';

export const Error = ({ children }) => {
  const styles = {
    display: 'block',
    backgroundColor: '#ef5350',
    padding: '12px 15px',
    margin: "20px 0",
    borderRadius: "5px"
  };
  return <div style={styles}>{children}</div>;
};
