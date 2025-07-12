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

    // Basic & address fields
    formData.append('enrollmentNumber', data.enrollmentNumber ?? '');
    formData.append('studentName', data.studentName ?? '');
    formData.append('studentNameHindi', data.studentNameHindi ?? '');
    formData.append('fatherName', data.fatherName ?? '');
    formData.append('email', data.email ?? '');
    formData.append('contactNumber', data.contactNo ?? '');
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

    // Exam Details
    data.examDetails.forEach((exam, idx) => {
      const index = idx + 1;
      formData.append(`exam${index}`, exam.exam ?? '');
      formData.append(`board${index}`, exam.board ?? '');
      formData.append(`percentage${index}`, exam.percentage ?? '');
      formData.append(`division${index}`, exam.division ?? '');
      formData.append(`yearOfPassing${index}`, exam.yearOfPassing ?? '');
      if (exam.marksheetFiles?.[0]) {
        formData.append(`marksheet${index}`, exam.marksheetFiles[0]);
      }
    });

    // Files
    if (data.idProofFile) formData.append('idProofFile', data.idProofFile);
    if (data.passportPhotoFile) formData.append('passportPhotoFile', data.passportPhotoFile);
    if (data.signatureFile) formData.append('signatureFile', data.signatureFile);
    if (data.paymentScreenshotFile) formData.append('paymentScreenshotFile', data.paymentScreenshotFile);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      const result = await res.text();
      if (result.toLowerCase().includes('success')) {
        alert('✅ Form submitted successfully!');
      } else {
        alert('❌ Submission failed:\n' + result);
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
