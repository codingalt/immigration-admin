import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notification from './components/Notification';
import Dashboard from './components/Dashboard';
import Ottp from './components/Ottp';
import Message from './components/Message';
import Calender from './components/Calender';
import Billing from './components/Billing';
import Invoice from './components/Invoice';
import ClientProfile from './components/ClientProfile';
import Email from './components/Email';
import Companyprofile from './components/Companyprofile';
import Prescreening from './components/Prescreening';
import Rejectpopup from './components/Rejectpopup';
import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';
import Prephase2 from './components/Prephase2';
import Prephase3 from "./components/Prephase3"
import Notes from './components/Notes';
import Phase3 from './components/Phase3';
import Caseworker from './components/Caseworker';
import Addcaseworker from './components/Addcaseworker';
import Addingprofile from './components/Addingprofile';
import Changepassowrd from './components/Changepassowrd';
import IdtableList from './components/IdtableList';
import Report from './components/Report';
import Congratspopup from './components/Congratspopup';
import Companydetail from './components/Companydetail';
import GroupAdminPhase from './components/GroupAdminPhase';
import Groupphase2 from './components/Groupphase2';
import GroupPrephase3 from './components/GroupPrephase3';
import GroupPhase3 from './components/GroupPhase3';
import Groupsidephase3 from './components/Groupsidephase3';
import GroupsidePrephase3 from './components/GroupsidePrephase3';
import LinkCOmpany from './components/LinkCOmpany';
import Forgetpassword from './components/Signin';
import Siginup from './components/Siginup';
import Protected from './components/Protected';
import Phase4Page from './pages/Phase4Page';
import AddPhase1 from './components/ManualApplication/AddPhase1';
import AddPhase2 from './components/ManualApplication/AddPhase2';
import AddPhase1Filled from './components/ManualApplication/AddPhase1Filled';
import AddPhase3 from './components/ManualApplication/AddPhase3';
import Phase4PageManual from './pages/Phase4PageManual';
import ServiceList from './components/ServiceList';
import GroupPrescreening from './components/GroupPrescreening';
import RejectGroup from './components/RejectGroup';
import ReportGroup from './components/ReportGroup';
import LinkCompanyGroup from './components/LinkCompanyGroup';
import Phase1Group from './components/Phase1Group';
import Prephase2Group from './components/PrePhase2Group';
import Phase2Group from './components/Phase2Group';
import Prephase3Group from './components/Prephase3Group';
import Phase3Group from './components/Phase3Group';
import Phase4GroupPage from './pages/Phase4GroupPage';
import ForgotPassword from './components/ForgotPassword';
import Resetpassword from './components/ResetPassword';


const NavRoutes = () => {
  return (
    <Routes>
      <Route path="/otp" element={<Ottp />} />
      <Route path="/" element={<Forgetpassword />} />
      <Route path="/forgetpassword" element={<ForgotPassword />} />
      <Route
        path="/restpassword/:userId/:token"
        element={<Protected Component={Resetpassword} />}
      />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/prescreening" element={<Prescreening />} />
      <Route path="/rejectpopup" element={<Rejectpopup />} />
      <Route path="/email" element={<Email />} />
      <Route path="/congrats" element={<Congratspopup />} />
      <Route path="/groupprephase2" element={<Groupphase2 />} />
      <Route path="/groupphase2" element={<GroupPrephase3 />} />
      <Route path="/groupprephase3" element={<GroupPhase3 />} />
      <Route path="/groupsideprephase3" element={<GroupsidePrephase3 />} />
      <Route path="/groupsidephase3" element={<Groupsidephase3 />} />

      {/* Admin Routes  */}
      <Route
        path="/admin/dashboard"
        element={<Protected Component={Dashboard} />}
      />
      <Route path="/calender" element={<Protected Component={Calender} />} />
      <Route
        path="/admin/notification"
        element={<Protected Component={Notification} />}
      />
      <Route
        path="/admin/prescreening/:applicationId"
        element={<Protected Component={Prescreening} />}
      />
      <Route
        path="/admin/reject/:applicationId"
        element={<Protected Component={Rejectpopup} />}
      />
      <Route
        path="/admin/phase1/:applicationId"
        element={<Protected Component={Phase1} />}
      />
      <Route
        path="/admin/prephase2/:applicationId"
        element={<Protected Component={Prephase2} />}
      />
      <Route
        path="/admin/phase2/:applicationId"
        element={<Protected Component={Phase2} />}
      />
      <Route
        path="/admin/prephase3/:applicationId"
        element={<Protected Component={Prephase3} />}
      />
      <Route
        path="/admin/phase3/:applicationId"
        element={<Protected Component={Phase3} />}
      />
      <Route
        path="/admin/phase4/:applicationId"
        element={<Protected Component={Phase4Page} />}
      />
      <Route
        path="/admin/linkcompany/:applicationId"
        element={<Protected Component={LinkCOmpany} />}
      />
      <Route
        path="/admin/caseworker"
        element={<Protected Component={Caseworker} />}
      />
      <Route
        path="/admin/addcaseworker"
        element={<Protected Component={Addcaseworker} />}
      />
      <Route
        path="/admin/clientprofiles"
        element={<Protected Component={ClientProfile} />}
      />
      <Route
        path="/admin/companyprofiles"
        element={<Protected Component={Companyprofile} />}
      />
      <Route
        path="/admin/addingprofile"
        element={<Protected Component={Addingprofile} />}
      />
      <Route
        path="/admin/search"
        element={<Protected Component={IdtableList} />}
      />
      <Route
        path="/admin/message"
        element={<Protected Component={Message} />}
      />
      <Route path="/admin/notes" element={<Protected Component={Notes} />} />
      <Route
        path="/admin/profile"
        element={<Protected Component={Changepassowrd} />}
      />
      <Route
        path="/admin/billing"
        element={<Protected Component={Billing} />}
      />

      {/* Add Manual Application   */}
      <Route path="/add/phase1" element={<Protected Component={AddPhase1} />} />
      <Route
        path="/add/phase1/filled/:applicationId"
        element={<Protected Component={AddPhase1Filled} />}
      />
      <Route
        path="/add/phase2/:applicationId"
        element={<Protected Component={AddPhase2} />}
      />
      <Route
        path="/add/phase3/:applicationId"
        element={<Protected Component={AddPhase3} />}
      />
      <Route
        path="/add/phase4/:applicationId"
        element={<Protected Component={Phase4PageManual} />}
      />
      <Route
        path="/report/:applicationId"
        element={<Protected Component={Report} />}
      />

      {/* Group Client  */}
      <Route
        path="/company/:companyName/:companyId"
        element={<Protected Component={Companydetail} />}
      />
      <Route
        path="/servicelist/:companyId"
        element={<Protected Component={ServiceList} />}
      />
      <Route
        path="/groupadminphase1/:companyId/:service"
        element={<Protected Component={GroupAdminPhase} />}
      />
      <Route
        path="/admin/group/prescreening/:applicationId"
        element={<Protected Component={GroupPrescreening} />}
      />
      <Route
        path="/admin/group/reject/:applicationId"
        element={<Protected Component={RejectGroup} />}
      />
      <Route
        path="/group/report/:applicationId"
        element={<Protected Component={ReportGroup} />}
      />
      <Route
        path="/admin/group/linkcompany/:applicationId"
        element={<Protected Component={LinkCompanyGroup} />}
      />
      <Route
        path="/admin/group/phase1/:applicationId"
        element={<Protected Component={Phase1Group} />}
      />
      <Route
        path="/admin/group/prephase2/:applicationId"
        element={<Protected Component={Prephase2Group} />}
      />
      <Route
        path="/admin/group/phase2/:applicationId"
        element={<Protected Component={Phase2Group} />}
      />
      <Route
        path="/admin/group/prephase3/:applicationId"
        element={<Protected Component={Prephase3Group} />}
      />
      <Route
        path="/admin/group/phase3/:applicationId"
        element={<Protected Component={Phase3Group} />}
      />
      <Route
        path="/admin/group/phase4/:applicationId"
        element={<Protected Component={Phase4GroupPage} />}
      />
    </Routes>
  );
};

export default NavRoutes