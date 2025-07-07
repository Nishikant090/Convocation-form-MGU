import React from 'react';
import { buttonStyle } from '../styles/formStyles';

interface FormButtonsProps {
  handlePrint: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({ handlePrint }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', justifyContent: 'center', gap: 24 }}>
      <button
        type="button"
        className="btn"
        style={buttonStyle}
        onClick={handlePrint}
      >
        Download / Print
      </button>
      <button
        type="submit"
        className="btn"
        style={buttonStyle}
      >
        Submit
      </button>
    </div>
  );
};

export default FormButtons; 