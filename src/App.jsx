import React, { useContext, useState } from 'react';
import "./App.css";
import NavRoutes from './NavRoutes';
import { useMemo } from 'react';
import { toastSuccess } from './components/Toast';
import MainContext from './components/Context/MainContext';

function App() {

  return (
    <>
      <div className="Container-main-div">
        <wc-toast theme="light"></wc-toast>
        <NavRoutes />
      </div>
    </>
  );
}

export default App;




