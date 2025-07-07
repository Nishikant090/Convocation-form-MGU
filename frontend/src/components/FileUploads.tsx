import React from 'react';
import type { ChangeEvent } from 'react';
import { inputStyle } from '../styles/formStyles';

interface FileUploadsProps {
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploads: React.FC<FileUploadsProps> = ({ handleFile }) => {
  return (
    <>
      <div style={{ marginTop: 28 }}>
        <label>ID Proof:</label>
        <input type="file" name="idProofFile" accept="application/pdf,image/*" className="form-control" style={inputStyle} onChange={handleFile} />
      </div>
      <div style={{ marginTop: 18 }}>
        <label>Passport Photo:</label>
        <input type="file" name="passportPhotoFile" accept="image/*" className="form-control" style={inputStyle} onChange={handleFile} />
      </div>
      <div style={{ marginTop: 28 }}>
        <label>Signature:</label>
        <input type="file" name="signatureFile" accept="image/*" className="form-control" style={inputStyle} onChange={handleFile} />
      </div>
      <div style={{ marginTop: 18 }}>
        <label>Payment Screenshot:</label>
        <input type="file" name="paymentScreenshotFile" accept="image/*" className="form-control" style={inputStyle} onChange={handleFile} />
      </div>
    </>
  );
};

export default FileUploads; 