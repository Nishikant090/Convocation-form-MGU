import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { FormData } from '../types/form';
import { API_URL, defaultExamDetails } from '../constants/formData';

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
  examDetails: defaultExamDetails,
  idProofFile: null,
  passportPhotoFile: null,
  degreeMode: '',
  signatureFile: null,
  paymentScreenshotFile: null,
};

export const useFormLogic = () => {
  const [data, setData] = useState<FormData>(defaultData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (name === 'paymentScreenshotFile') setData((d) => ({ ...d, paymentScreenshotFile: file }));
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
    formData.append('alumniToken', data.alumniToken ?? '');
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
      if (exam.marksheetFiles && exam.marksheetFiles.length > 0) {
        exam.marksheetFiles.forEach((file, fileIdx) => {
          formData.append(`examDetails[${idx}][marksheet${fileIdx+1}]`, file);
        });
      }
    });
    
    if (data.idProofFile) formData.append('idProof', data.idProofFile);
    if (data.passportPhotoFile) formData.append('passportPhoto', data.passportPhotoFile);
    if (data.signatureFile) formData.append('signature', data.signatureFile);
    if (data.paymentScreenshotFile) formData.append('paymentScreenshot', data.paymentScreenshotFile);
    
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        alert('✅ Form submitted successfully!');
      } else {
        alert('❌ Submission failed: ' + (result.message || ''));
      }
    } catch (err) {
      console.error(err);
      alert('🚫 Could not connect to backend.');
    }
  };

  return {
    data,
    handleChange,
    handleExamFiles,
    handleExamChange,
    handleFile,
    handleDegreeMode,
    handleSubmit,
  };
}; 