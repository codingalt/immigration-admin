import React, { useState } from 'react';
import "./App.css";
import NavRoutes from './NavRoutes';
import { useMemo } from 'react';
import { toastSuccess } from './components/Toast';

function App() {
  const [getData, setGetData] = useState();
  useMemo(()=>{
    if(getData){
      toastSuccess("New Phase Request from client");
    }
  },[getData])
  return (
    <>
      <div className="Container-main-div">
        <wc-toast theme="light"></wc-toast>
        <NavRoutes setGetData={setGetData} getData={getData} />
      </div>
    </>
  );
}

export default App;




