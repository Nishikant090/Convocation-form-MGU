import React from 'react';
import type { ExamDetail } from '../types/form';
import { inputStyle } from '../styles/formStyles';

interface ExamDetailsProps {
  examDetails: ExamDetail[];
  handleExamChange: (idx: number, field: string, value: string) => void;
  handleExamFiles: (idx: number, files: FileList | null) => void;
}

const ExamDetails: React.FC<ExamDetailsProps> = ({ examDetails, handleExamChange, handleExamFiles }) => {
  return (
    <div style={{ marginTop: 28 }}>
      <label>Examination Details</label>
      <table className="table table-bordered mt-2" style={{ color: '#333333', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(51,51,51,0.07)' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th>Examination</th>
            <th>Board</th>
            <th>Percentage</th>
            <th>Division</th>
            <th>Year of Passing</th>
            <th>Upload Marksheet</th>
          </tr>
        </thead>
        <tbody>
          {examDetails.map((exam, idx) => (
            <tr key={exam.exam}>
              <td>{exam.exam}</td>
              <td><input value={exam.board} onChange={e => handleExamChange(idx, 'board', e.target.value)} className="form-control" style={inputStyle} /></td>
              <td><input value={exam.percentage} onChange={e => handleExamChange(idx, 'percentage', e.target.value)} className="form-control" style={inputStyle} /></td>
              <td><input value={exam.division} onChange={e => handleExamChange(idx, 'division', e.target.value)} className="form-control" style={inputStyle} /></td>
              <td><input value={exam.yearOfPassing} onChange={e => handleExamChange(idx, 'yearOfPassing', e.target.value)} className="form-control" style={inputStyle} /></td>
              <td>
                {(exam.exam === 'Graduation' || exam.exam === 'Masters') ? (
                  <input type="file" accept="application/pdf,image/*" multiple onChange={e => handleExamFiles(idx, e.target.files)} className="form-control" style={inputStyle} />
                ) : (
                  <input type="file" accept="application/pdf,image/*" onChange={e => handleExamFiles(idx, e.target.files)} className="form-control" style={inputStyle} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamDetails; 