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
  idProofFile: File | null;
  passportPhotoFile: File | null;
  degreeMode: 'normal' | 'tatkal' | '';
  signatureFile: File | null;
  paymentScreenshotFile: File | null;
} 