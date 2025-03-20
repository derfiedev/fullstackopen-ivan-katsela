import { useEffect, useState } from "react";
import axios from "axios";
import { DisplayCountry } from "./DisplayCountry";

export const Search = ({ result, country }) => {
  const [show, setShow] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    setShow(
      result.filter((c) =>
        c.name.common.toString().toLowerCase().includes(country.toString().toLowerCase())
      )
    );
  }, [country, result]);

  const handleShow = (country) => {
    setShowCountry(true);
    setShow([country]);
  };

  if (show.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (show.length === 1) {
    return <DisplayCountry country={show[0]} />;
  } else if (show.length === 0) {
    return <p>No matches, specify another filter</p>;
  } else {
    
    return (
      <div>
        {show.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShow(country)}>show</button>

          </div>
        ))}
      </div>
    );
  }
};