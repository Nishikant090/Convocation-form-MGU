import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useFormLogic } from './hooks/useFormLogic';
import FormButtons from './components/FormButtons';

import Header from './components/Header';
import PersonalDetails from './components/PersonalDetails';
import AddressSection from './components/AddressSection';
import Program from './components/Program';
import ExamDetails from './components/ExamDetails';
import FileUploads from './components/FileUploads';
import DegreeMode from './components/DegreeMode';
import { formContainerStyle, mainContainerStyle } from './styles/formStyles';

function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const { data, handleChange, handleExamFiles, handleExamChange, handleFile, handleDegreeMode, handleSubmit } = useFormLogic();
  const handlePrint = useReactToPrint({
    contentRef: formRef,
  });

  
  return (
    <div style={mainContainerStyle}>
      <Header />
      <div ref={formRef} style={formContainerStyle}>
                <h2 style={{ textAlign: 'center', fontWeight: 800, marginBottom: 32, letterSpacing: 1, color: 'black' }}>
          
        </h2>
        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
          <PersonalDetails data={data} handleChange={handleChange} />
          <AddressSection data={data} handleChange={handleChange} />
          <Program program={data.program} handleChange={handleChange} />
          <ExamDetails 
            examDetails={data.examDetails} 
            handleExamChange={handleExamChange} 
            handleExamFiles={handleExamFiles} 
          />
          <FileUploads handleFile={handleFile} />
          <DegreeMode degreeMode={data.degreeMode} handleDegreeMode={handleDegreeMode} />
          <FormButtons handlePrint={handlePrint} />
        </form>
      </div>
      <style>{`
        label {
          color: #E65100 !important;
        }
        th, td {
          color: #E65100 !important;
        }
        h2, h4, .btn {
          color: #333333 !important;
        }
        ::placeholder {
          color: #E65100 !important;
          opacity: 0.7;
        }
        ::-webkit-input-placeholder {
          color: #E65100 !important;
          opacity: 0.7;
        }
        ::-moz-placeholder {
          color: #E65100 !important;
          opacity: 0.7;
        }
        ::-ms-input-placeholder {
          color: #E65100 !important;
          opacity: 0.7;
        }
        .form-control {
          border: 1.5px solid #cccccc;
          border-radius: 8px;
          font-size: 1em;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .form-control:focus {
          border-color: #FF9800;
          box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.2);
          outline: none;
        }
        .btn {
          background: linear-gradient(90deg, #FF9800 0%, #FF5722 100%);
          color: #fff !important;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          padding: 0.7em 2.2em;
          font-size: 1.1em;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.2);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .btn:hover {
          background: linear-gradient(90deg, #FF5722 0%, #FF9800 100%);
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 4px 16px rgba(255, 152, 0, 0.3);
        }
        table th, table td {
          text-align: center;
        }
        h2 {
          color: #FF5722 !important;
        }
      `}</style>
    </div>
  );
}

export default App; 