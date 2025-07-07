import React from 'react';
import logo from '../assets/logo.png'; // adjust the path if needed

const Header: React.FC = () => {
return (
    <div className="text-center mb-4" style={{ maxWidth: 960, width: '100%' }}>
      <img src={logo} alt="Logo" style={{ height: '100px', marginBottom: '10px', border: '3px solid rgb(19, 18, 18)', borderRadius: 12, background: '#fff7f3', padding: 12 }} />
      

      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF5722, #ff8a50)', borderRadius: 2, margin: '0 auto 16px auto', width: '60%' }}></div>
      <p style={{ fontSize: '14px', lineHeight: '1.4', color: 'black', fontWeight: 500 }}>
        Mahatma Gandhi University, Meghalaya<br />
        13th Mile, G S Road, PO & OP – Byrnihat, District – Ri-Bhoi, Meghalaya<br />
        Approved by Gov. of Meghalaya, Recognized by UGC, PCI, BCI, Member of AIU
      </p>
      <br></br>
      <h3>CONVOCATION FORM </h3>
    </div>
  );

};

export default Header;
