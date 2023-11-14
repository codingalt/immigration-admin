import React from 'react';
import Select from 'react-select'; // Import the actual select library you are using
import "../style/Phase1.css"

const Selector = () => {
  const myData = [
    { label: 'English', value: 1 },
    { label: 'Urdu', value: 2 },
    { label: 'German', value: 3 },
    { label: 'spanish', value: 4 },
    { label: 'turkish', value: 5 },
    { label: 'hindi', value: 6 },
    { label: 'Arabic', value: 7 },

  ];

  return (
    <div>
      <Select className='new-selector'
        options={myData} // Use "options" instead of "data" for react-select
        isMulti={true} // Use "isMulti" instead of "selectMultiple"
     
      />
    </div>
  );
}

export default Selector;

