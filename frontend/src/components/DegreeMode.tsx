import React from 'react';

interface DegreeModeProps {
  degreeMode: 'normal' | 'tatkal' | '';
  handleDegreeMode: (mode: 'normal' | 'tatkal') => void;
}

const DegreeMode: React.FC<DegreeModeProps> = ({ degreeMode, handleDegreeMode }) => {
  return (
    <div style={{ marginTop: 28 }}>
      <label>Apply Degree Mode & Duration</label>
      <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#333333', fontWeight: 500 }}>
          <input type="radio" name="degreeMode" checked={degreeMode === 'normal'} onChange={() => handleDegreeMode('normal')} />
          Normal Mode (Rs 12,000/ 90 Days)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#333333', fontWeight: 500 }}>
          <input type="radio" name="degreeMode" checked={degreeMode === 'tatkal'} onChange={() => handleDegreeMode('tatkal')} />
          Tatkal Mode (Rs 20,000/ 30 Days)
        </label>
      </div>
    </div>
  );
};

export default DegreeMode; 