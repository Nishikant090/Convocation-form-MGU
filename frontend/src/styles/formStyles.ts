export const inputStyle = {
  border: '1.5px solid #cccccc',
  borderRadius: 8,
  fontSize: '1em',
  padding: '0.5em 1em',
  marginTop: 4,
  marginBottom: 4,
  color: '#333333',
  background: '#fff',
  transition: 'border 0.2s, box-shadow 0.2s',
};

export const buttonStyle = {
  background: 'linear-gradient(90deg, #FF9800 0%, #FF5722 100%)',
  color: '#fff',
  fontWeight: 700,
  border: 'none',
  borderRadius: 8,
  padding: '0.7em 2.2em',
  fontSize: '1.1em',
  boxShadow: '0 2px 8px rgba(255,87,34,0.10)',
  transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
};

export const formContainerStyle = {
  width: '100%',
  maxWidth: 700,
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: 24,
  border: '3px solid #FF9800',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
  padding: '2.5rem 2rem',
  margin: '2rem 0',
  color: '#333333',
};

import type { CSSProperties } from 'react';

export const mainContainerStyle: CSSProperties = {
  minHeight: '100vh',
  width: '100vw',
  background: '#f39e6d',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Poppins, Arial, sans-serif',
};
