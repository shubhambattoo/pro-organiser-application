import React from 'react';

export const Error = ({ children, canClose }) => {
  const alert = {
    display: 'block',
    backgroundColor: '#ef5350',
    padding: '12px 15px',
    margin: '20px 0',
    borderRadius: '5px',
    color: '#fff',
    position: 'relative'
  };

  const close = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    cursor: 'pointer',
    color: '#fff'
  };

  return (
    <div style={alert}>
      <div style={close} onClick={() => canClose(true)}>
        &times;
      </div>
      {children}
    </div>
  );
};
