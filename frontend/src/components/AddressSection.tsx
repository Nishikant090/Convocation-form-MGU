import React from 'react';
import type { ChangeEvent } from 'react';
import { inputStyle } from '../styles/formStyles';
import { states, districts } from '../constants/formData';

interface AddressSectionProps {
  data: {
    currentState: string;
    currentDistrict: string;
    currentPin: string;
    currentAddress: string;
    permanentState: string;
    permanentDistrict: string;
    permanentPin: string;
    permanentAddress: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({ data, handleChange }) => {
  return (
    <>
      <div style={{ marginTop: 28 }}>
        <label style={{ fontWeight: 600 }}>Current Address</label>
        <div className="row" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
          <select name="currentState" value={data.currentState} onChange={handleChange} className="form-control" style={inputStyle}>
            <option value="">Select State</option>
            {states.map((s: string) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="currentDistrict" value={data.currentDistrict} onChange={handleChange} className="form-control" style={inputStyle}>
            <option value="">Select District</option>
            {districts.map((d: string) => <option key={d} value={d}>{d}</option>)}
          </select>
          <input name="currentPin" value={data.currentPin} onChange={handleChange} className="form-control" style={inputStyle} placeholder="PIN Code" />
          <textarea name="currentAddress" value={data.currentAddress} onChange={handleChange} className="form-control" style={{ ...inputStyle, minHeight: 38 }} placeholder="Enter Address Here" />
        </div>
      </div>
      <div style={{ marginTop: 28 }}>
        <label style={{ fontWeight: 600 }}>Permanent Address</label>
        <div className="row" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
          <select name="permanentState" value={data.permanentState} onChange={handleChange} className="form-control" style={inputStyle}>
            <option value="">Select State</option>
            {states.map((s: string) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="permanentDistrict" value={data.permanentDistrict} onChange={handleChange} className="form-control" style={inputStyle}>
            <option value="">Select District</option>
            {districts.map((d: string) => <option key={d} value={d}>{d}</option>)}
          </select>
          <input name="permanentPin" value={data.permanentPin} onChange={handleChange} className="form-control" style={inputStyle} placeholder="PIN Code" />
          <textarea name="permanentAddress" value={data.permanentAddress} onChange={handleChange} className="form-control" style={{ ...inputStyle, minHeight: 38 }} placeholder="Enter Address Here" />
        </div>
      </div>
    </>
  );
};

export default AddressSection; 