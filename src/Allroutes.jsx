import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Forgetpassword from './components/Forgetpassword';
import Phase1 from './components/Phase1';
import Filldata from './components/Filldata';
import Phase2 from './components/Phase2';
import Signin from "./components/Signin"
import Singup from "./components/Siginup"
import Resetpassword from './components/Resetpassword';
import Otp from './components/Otp';
import Otpemail from './components/Otpemail';
import Companyscreen from "./components/Companyscreen"
import Agreement from './components/Agreement';
import Phase3 from './components/Phase3';
import Adddetails from './components/Adddetails';
import Phase4 from './components/Phase4';
import Settings from './components/Settings';
import Acomodation from './components/Acomodation';
import Family from './components/Family';
import LanguageProfeciency from './components/LanguageProfeciency';
import Education from './components/Education';
import Employement from './components/Employement';
import Mainteance from './components/Mainteance';
import Travel from './components/Travel';
import Charcater from './components/Charcater';
import Message from './components/Messagechatbox';
import Filldata2 from './components/Filldata2';
import Rejectpopup from './components/Rejectpopup';
import Filldataphase4 from './components/Filldataphase4';
import Acomodationdata from './components/Acomodationdata';
import FamilyData from './components/FamilyData';
import Congratspopup from './components/Congratspopup';
import Languageprofeciencydata from './components/Languageprofeciencydata';
import Educationdata from './components/Educationdata';
import Employementdatafill from './components/Employementdatafill';
import Mainteincedata from './components/Mainteincedata';
import Traveldata from './components/Traveldata';
import CharacterData from './components/Characterdata';
import Rejectedbyauthority from './components/Rejectedbyauthority';
import Approvedbyauthority from './components/Approvedbyauthority';
import FilldataAllphase from './components/FilldataAllphase';
import FilldataAllphases2 from './components/FilldataAllphases2';
import Congratsphase4 from './components/Congratsphase4';
import Submissionpopup from './components/Submissionpopup';
import Protected from './components/Protected';
import EmailVerify from './components/EmailVerify';
import Payment from './components/Payment';
import Phase4Page from './pages/Phase4Page';
import Phase4FilledDataPage from './pages/Phase4FilledDataPage';
import PdfView from './components/Documents/PdfView';




const Allroutes = () => {
  return (
    <Routes>
      <Route
        path="/adddetails/:applicationId"
        element={<Protected Component={Payment} />}
      />
      <Route path="/filldata" element={<Protected Component={Filldata} />} />
      <Route exact path="/" element={<Signin />} />
      <Route path="/signup" element={<Singup />} />
      <Route path="/otp" element={<Otp />} />
      <Route
        path="/forgetpassword"
        element={<Protected Component={Forgetpassword} />}
      />
      <Route
        path="/restpassword/:userId/:token"
        element={<Protected Component={Resetpassword} />}
      />
      <Route
        path="/:userId/verify/:token"
        element={<Protected Component={EmailVerify} />}
      />
      <Route
        path="/companyscreen"
        element={<Protected Component={Companyscreen} />}
      />
      <Route path="/phase1" element={<Protected Component={Phase1} />} />
      <Route path="/phase2" element={<Protected Component={Phase2} />} />
      <Route path="/otpmail" element={<Otpemail />} />
      <Route path="/agreement" element={<Protected Component={Agreement} />} />
      <Route path="/phase3" element={<Protected Component={Phase3} />} />
      <Route path="/phase4" element={<Protected Component={Phase4Page} />} />
      <Route path="/setting" element={<Protected Component={Settings} />} />
      <Route path="/message" element={<Protected Component={Message} />} />
      <Route path="/Rejectpopup" element={<Rejectpopup />} />
      <Route path="/finaldata2" element={<Filldata2 />} />
      <Route path="/finaldataphase4" element={<Filldataphase4 />} />
      <Route
        path="/phase4/data"
        element={<Protected Component={Phase4FilledDataPage} />}
      />
      <Route path="/congrats" element={<Congratspopup />} />
      <Route path="/rejectbyauthority" element={<Rejectedbyauthority />} />
      <Route path="/Approvedbyauthority" element={<Approvedbyauthority />} />
      <Route path="/filldataallphase" element={<FilldataAllphase />} />
      <Route path="/filldataallphase2" element={<FilldataAllphases2 />} />
      <Route path="/congratsphase4" element={<Congratsphase4 />} />
      <Route path="/submissionpopup" element={<Submissionpopup />} />
    </Routes>
  );
}

export default Allroutes