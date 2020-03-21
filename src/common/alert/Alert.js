import React from 'react';

export const Alert = ({ children, canClose, type, isClosable = true }) => {
  const alert = {
    display: 'block',
    padding: '12px 15px',
    margin: '20px 0',
    borderRadius: '5px',
    position: 'relative',
    fontSize: '15px',
    fontWeight: '500'
  };

  const close = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    cursor: 'pointer',
    color: '#fff'
  };

  switch (type) {
    case 'error':
      alert['backgroundColor'] = '#ef5350';
      alert['color'] = '#fff';
      break;
    case 'info':
      alert['backgroundColor'] = '#1E75C1';
      alert['color'] = '#fff';
      break;
    default:
      break;
  }

  return (
    <div style={alert}>
      {isClosable && (
        <div style={close} onClick={() => canClose(true)}>
          &times;
        </div>
      )}
      {children}
    </div>
  );
};
