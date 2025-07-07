import React from 'react';
import type { ChangeEvent } from 'react';
import { inputStyle } from '../styles/formStyles';
import { programs } from '../constants/formData';

interface ProgramProps {
  program: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Program: React.FC<ProgramProps> = ({ program, handleChange }) => {
  return (
    <div style={{ marginTop: 28 }}>
      <label>Program</label>
      <select name="program" value={program} onChange={handleChange} className="form-control" style={inputStyle}>
        <option value="">Select a Program</option>
        {programs.map((p: string) => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  );
};

export default Program; 