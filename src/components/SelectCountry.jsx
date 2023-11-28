import { Field } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useGetCountriesQuery } from "../services/api/applicationApi";
import countryList from "react-select-country-list";

const SelectCountry = ({ name, className, notReq, disabled }) => {
  const [countries, setCountries] = useState([]);
  const { data: country } = useGetCountriesQuery();
  const options = useMemo(() => countryList().getData(), []);

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
      {options?.map((country, index) => (
        <option key={index} value={country.label}>
          {country.label}
        </option>
      ))}
    </Field>
  );
};

export default SelectCountry;
