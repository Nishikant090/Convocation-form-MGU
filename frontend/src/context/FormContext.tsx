import { createContext, useContext, useState } from 'react';
import type { ChangeEvent } from 'react';
import Header from '../components/Header';

const API_URL = 'http://localhost:5000/api/submit';

const states = ['Uttar Pradesh', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Other'];
const districts = ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Other'];
const programs = ['B.Tech', 'M.Tech', 'MBA', 'B.Sc', 'M.Sc', 'Other'];

export interface ExamDetail {
  exam: string;
  board: string;
  percentage: string;
  division: string;
  yearOfPassing: string;
  marksheetFiles: File[];
}

export interface FormData {
  enrollmentNumber: string;
  studentName: string;
  studentNameHindi: string;
  fatherName: string;
  email: string;
  contactNo: string;
  alumniToken: string;
  currentState: string;
  currentDistrict: string;
  currentPin: string;
  currentAddress: string;
  permanentState: string;
  permanentDistrict: string;
  permanentPin: string;
  permanentAddress: string;
  program: string;
  examDetails: ExamDetail[];
  idProof: string | null;
  idProofFile: File | null;
  passportPhoto: string | null;
  passportPhotoFile: File | null;
  degreeMode: 'normal' | 'tatkal' | '';
  signature: string | null;
  signatureFile: File | null;
  paymentScreenshot: string | null;
  paymentScreenshotFile: File | null;
}

const FormContext = createContext<{
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
} | null>(null);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

const defaultData: FormData = {
  enrollmentNumber: '',
  studentName: '',
  studentNameHindi: '',
  fatherName: '',
  email: '',
  contactNo: '',
  alumniToken: '',
  currentState: '',
  currentDistrict: '',
  currentPin: '',
  currentAddress: '',
  permanentState: 'Uttar Pradesh',
  permanentDistrict: 'Lucknow',
  permanentPin: '',
  permanentAddress: '',
  program: '',
  examDetails: [
    { exam: 'Class X', board: '', percentage: '', division: '', yearOfPassing: '', marksheetFiles: [] },
    { exam: 'Class XII', board: '', percentage: '', division: '', yearOfPassing: '', marksheetFiles: [] },
    { exam: 'Graduation', board: '', percentage: '', division: '', yearOfPassing: '', marksheetFiles: [] },
    { exam: 'Masters', board: '', percentage: '', division: '', yearOfPassing: '', marksheetFiles: [] },
  ],
  idProof: null,
  idProofFile: null,
  passportPhoto: null,
  passportPhotoFile: null,
  degreeMode: '',
  signature: null,
  signatureFile: null,
  paymentScreenshot: null,
  paymentScreenshotFile: null,
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FormData>(defaultData);
  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
};

const AppContent: React.FC = () => {
  const { data, setData } = useForm();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const handleExamFiles = (idx: number, files: FileList | null) => {
    setData((d) => ({
      ...d,
      examDetails: d.examDetails.map((exam, i) =>
        i === idx ? { ...exam, marksheetFiles: files ? Array.from(files) : [] } : exam
      ),
    }));
  };

  const handleExamChange = (idx: number, field: string, value: string) => {
    setData((d) => ({
      ...d,
      examDetails: d.examDetails.map((exam, i) =>
        i === idx ? { ...exam, [field]: value } : exam
      ),
    }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    if (name === 'idProofFile') setData((d) => ({ ...d, idProofFile: file }));
    if (name === 'passportPhotoFile') setData((d) => ({ ...d, passportPhotoFile: file }));
    if (name === 'signatureFile') setData((d) => ({ ...d, signatureFile: file }));
    if (name === 'paymentScreenshotFile')
      setData((d) => ({ ...d, paymentScreenshotFile: file }));
  };

  const handleDegreeMode = (mode: 'normal' | 'tatkal') => {
    setData((d) => ({ ...d, degreeMode: mode }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('enrollmentNumber', data.enrollmentNumber ?? '');
    formData.append('studentName', data.studentName ?? '');
    formData.append('studentNameHindi', data.studentNameHindi ?? '');
    formData.append('fatherName', data.fatherName ?? '');
    formData.append('email', data.email ?? '');
    formData.append('contactNo', data.contactNo ?? '');
    formData.append('currentState', data.currentState ?? '');
    formData.append('currentDistrict', data.currentDistrict ?? '');
    formData.append('currentPin', data.currentPin ?? '');
    formData.append('currentAddress', data.currentAddress ?? '');
    formData.append('permanentState', data.permanentState ?? '');
    formData.append('permanentDistrict', data.permanentDistrict ?? '');
    formData.append('permanentPin', data.permanentPin ?? '');
    formData.append('permanentAddress', data.permanentAddress ?? '');
    formData.append('program', data.program ?? '');
    formData.append('degreeMode', data.degreeMode ?? '');

    data.examDetails.forEach((exam, idx) => {
      formData.append(`examDetails[${idx}][exam]`, exam.exam);
      formData.append(`examDetails[${idx}][board]`, exam.board);
      formData.append(`examDetails[${idx}][percentage]`, exam.percentage);
      formData.append(`examDetails[${idx}][division]`, exam.division);
      formData.append(`examDetails[${idx}][yearOfPassing]`, exam.yearOfPassing);
      if (exam.marksheetFiles?.length) {
        exam.marksheetFiles.forEach((file: File, fileIdx: number) => {
          formData.append(`examDetails[${idx}][marksheet${fileIdx + 1}]`, file);
        });
      }
    });

    if (data.idProofFile) formData.append('idProof', data.idProofFile);
    if (data.passportPhotoFile) formData.append('passportPhoto', data.passportPhotoFile);
    if (data.signatureFile) formData.append('signature', data.signatureFile);
    if (data.paymentScreenshotFile)
      formData.append('paymentScreenshot', data.paymentScreenshotFile);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        alert('✅ Form submitted successfully!');
      } else {
        alert(`❌ Submission failed: ${result.message || ''}`);
      }
    } catch (err) {
      console.error(err);
      alert('🚫 Could not connect to backend.');
    }
  };

  return (
    <div
  style={{
    minHeight: '100vh',
    width: '100vw',
    background: 'white',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Poppins, Arial, sans-serif',
  }}
>

      <Header />
     <div
  style={{
    minHeight: '100vh',
    width: '100vw',
    background: 'white',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Poppins, Arial, sans-serif',
  }}
>

        <h4 style={{ color: '#111', fontWeight: 800, marginBottom: 2 }}>
          Convocation Form
        </h4>

        {/* Personal Details */}
        <div className="row mb-3">
          <div className="col-md-6 col-12">
            <label>Enrollment Number</label>
            <input
              name="enrollmentNumber"
              value={data.enrollmentNumber}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 col-12">
            <label>Student Name</label>
            <input
              name="studentName"
              value={data.studentName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 col-12">
            <label>Student Name In Hindi</label>
            <input
              name="studentNameHindi"
              value={data.studentNameHindi}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 col-12">
            <label>Father's Name</label>
            <input
              name="fatherName"
              value={data.fatherName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 col-12">
            <label>Email-ID</label>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 col-12">
            <label>Contact No</label>
            <input
              name="contactNo"
              value={data.contactNo}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Current Address */}
        <div className="mb-3">
          <label>Current Address</label>
          <div className="row mb-2">
            <div className="col-md-3 col-12 mb-2 mb-md-0">
              <select
                name="currentState"
                value={data.currentState}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 col-12 mb-2 mb-md-0">
              <select
                name="currentDistrict"
                value={data.currentDistrict}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 col-12 mb-2 mb-md-0">
              <input
                name="currentPin"
                value={data.currentPin}
                onChange={handleChange}
                className="form-control"
                placeholder="PIN Code"
              />
            </div>
            <div className="col-md-3 col-12">
              <textarea
                name="currentAddress"
                value={data.currentAddress}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Address Here"
              />
            </div>
          </div>
        </div>

        {/* Permanent Address */}
        <div className="mb-3">
          <label>Permanent Address</label>
          <div className="row mb-2">
            <div className="col-md-3 col-12 mb-2 mb-md-0">
              <select
                name="permanentState"
                value={data.permanentState}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 col-12 mb-2 mb-md-0">
              <select
                name="permanentDistrict"
                value={data.permanentDistrict}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 col-12 mb-2 mb-md-0">
              <input
                name="permanentPin"
                value={data.permanentPin}
                onChange={handleChange}
                className="form-control"
                placeholder="PIN Code"
              />
            </div>
            <div className="col-md-3 col-12">
              <textarea
                name="permanentAddress"
                value={data.permanentAddress}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Address Here"
              />
            </div>
          </div>
        </div>

        {/* Program */}
        <div className="mb-3">
          <label>Program</label>
          <select
            name="program"
            value={data.program}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select a Program</option>
            {programs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Examination Details */}
        <div className="mb-3">
          <label>Examination Details</label>
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>Examination</th>
                <th>Board</th>
                <th>Percentage</th>
                <th>Division</th>
                <th>Year of Passing</th>
                <th>Upload Marksheet</th>
              </tr>
            </thead>
            <tbody>
              {data.examDetails.map((exam, idx) => (
                <tr key={`${exam.exam}-${idx}`}>
                  <td>{exam.exam}</td>
                  <td>
                    <input
                      value={exam.board}
                      onChange={(e) => handleExamChange(idx, 'board', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={exam.percentage}
                      onChange={(e) => handleExamChange(idx, 'percentage', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={exam.division}
                      onChange={(e) => handleExamChange(idx, 'division', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={exam.yearOfPassing}
                      onChange={(e) => handleExamChange(idx, 'yearOfPassing', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    {exam.exam === 'Graduation' || exam.exam === 'Masters' ? (
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        multiple
                        onChange={(e) => handleExamFiles(idx, e.target.files)}
                        className="form-control"
                      />
                    ) : (
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        onChange={(e) => handleExamFiles(idx, e.target.files)}
                        className="form-control"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* File Uploads */}
        <div className="mb-3">
          <label>ID Proof:</label>
          <input
            type="file"
            name="idProofFile"
            accept="application/pdf,image/*"
            className="form-control"
            onChange={handleFile}
          />
        </div>
        <div className="mb-3">
          <label>Passport Photo:</label>
          <input
            type="file"
            name="passportPhotoFile"
            accept="image/*"
            className="form-control"
            onChange={handleFile}
          />
        </div>

        {/* Degree Mode */}
        <div className="mb-3">
          <label>Apply Degree Mode & Duration</label>
          <div style={{ display: 'flex', gap: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="radio"
                name="degreeMode"
                checked={data.degreeMode === 'normal'}
                onChange={() => handleDegreeMode('normal')}
              />
              Normal Mode (Rs 12,000/ 90 Days)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="radio"
                name="degreeMode"
                checked={data.degreeMode === 'tatkal'}
                onChange={() => handleDegreeMode('tatkal')}
              />
              Tatkal Mode (Rs 20,000/ 30 Days)
            </label>
          </div>
        </div>

        {/* Signature & Payment */}
        <div className="mb-3">
          <label>Signature:</label>
          <input
            type="file"
            name="signatureFile"
            accept="image/*"
            className="form-control"
            onChange={handleFile}
          />
        </div>
        <div className="mb-3">
          <label>Payment Screenshot:</label>
          <input
            type="file"
            name="paymentScreenshotFile"
            accept="image/*"
            className="form-control"
            onChange={handleFile}
          />
        </div>

        {/* Buttons */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            className="btn"
            style={{ minWidth: 180, fontSize: '1.1em', marginRight: 16 }}
            
          >
            Download / Print
          </button>
          <button
            className="btn"
            style={{ minWidth: 180, fontSize: '1.1em' }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <FormProvider>
    <AppContent />
  </FormProvider>
);

export default App;
