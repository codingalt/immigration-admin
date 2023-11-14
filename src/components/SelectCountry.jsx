import { Field } from "formik";
import React, { useEffect, useState } from "react";
import { useGetCountriesQuery } from "../services/api/applicationApi";

const SelectCountry = ({ name, className, notReq, disabled }) => {
  const [countries, setCountries] = useState([]);
  const { data: country } = useGetCountriesQuery();

  useEffect(() => {
    const countryNames = country?.map((country) => country.name.common);
    const sortedCountries = countryNames?.sort();
    setCountries(sortedCountries);
  }, [country]);

  return (
    <Field
      disabled={disabled}
      required={notReq ? false : true}
      as="select"
      name={name}
      id={name}
      className={className}
    >
      <option value="">Select Country</option>
      {countries?.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </Field>
  );
};

export default SelectCountry;
