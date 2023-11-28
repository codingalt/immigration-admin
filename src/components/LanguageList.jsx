import React, { useEffect, useState } from "react";
import axios from "axios";
import { Field } from "formik";

function LanguageList({ name, className, onChange, defaultValue, prevValue, setFieldValue,disabled }) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        // Extract language data from the API response
        const languagesData = response?.data?.reduce((acc, country) => {
          return acc.concat(country.languages.map((lang) => lang.name));
        }, []);

        // Remove duplicates
        const uniqueLanguages = Array.from(new Set(languagesData));

        setLanguages(uniqueLanguages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <select
      disabled={disabled}
      value={defaultValue}
      required
      as="select"
      name={name}
      id={name}
      className={className}
      onChange={(e) => {
        if (!prevValue.includes(e.target.value)) {
          onChange([...prevValue, e.target.value]);
          setFieldValue(name, [
            ...prevValue,
            e.target.value,
          ]);
        }
      }}
    >
      <option value="">Select Language</option>
      {languages?.map((language, index) => (
        <option key={index} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}

export default LanguageList;
