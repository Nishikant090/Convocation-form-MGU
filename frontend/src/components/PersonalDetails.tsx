import React from 'react';
import type { ChangeEvent } from 'react';
import { inputStyle } from '../styles/formStyles';

interface PersonalDetailsProps {
  data: {
    enrollmentNumber: string;
    studentName: string;
    studentNameHindi: string;
    fatherName: string;
    email: string;
    contactNo: string;
    alumniToken: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data, handleChange }) => {
  return (
    <>
      <div className="row" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label>Enrollment Number</label>
          <input name="enrollmentNumber" value={data.enrollmentNumber} onChange={handleChange} className="form-control" style={inputStyle} required />
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label>Student Name</label>
          <input name="studentName" value={data.studentName} onChange={handleChange} className="form-control" style={inputStyle} required />
        </div>
      </div>
      <div className="row" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 18 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label>Student Name In Hindi</label>
          <input name="studentNameHindi" value={data.studentNameHindi} onChange={handleChange} className="form-control" style={inputStyle} />
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label>Father's Name</label>
          <input name="fatherName" value={data.fatherName} onChange={handleChange} className="form-control" style={inputStyle} />
        </div>
      </div>
      <div className="row" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 18 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label>Email-ID</label>
          <input name="email" value={data.email} onChange={handleChange} className="form-control" style={inputStyle} type="email" required />
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label>Contact No</label>
          <input name="contactNo" value={data.contactNo} onChange={handleChange} className="form-control" style={inputStyle} type="tel" required />
        </div>
      </div>
      <div className="row" style={{ marginTop: 18 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label>Alumni Token</label>
          <input name="alumniToken" value={data.alumniToken} onChange={handleChange} className="form-control" style={inputStyle} />
        </div>
      </div>
    </>
  );
};

export default PersonalDetails; 