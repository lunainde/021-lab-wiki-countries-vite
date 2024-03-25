import Navbar from "../components/Navbar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

function HomePage() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get('https://ih-countries-api.herokuapp.com/countries')
    .then(res => {
      setCountries(res.data);
    })
    .catch(error => console.log(error));
    }, []);
  
  return (
    <div className="container">
        <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>WikiCountries: Your Guide to the World</h1>
        
        <ul>
        <div className="content">
          {countries.map((country) => (
            <li key={country.alpha3Code}>
              <Link to={`/${country.alpha3Code}`} className="content-link">
                <img className="content-img"
                  src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} 
                  alt="Flag"/>
                <h6>{country.name.common}</h6>
              </Link>
            </li>
          ))}
        </div>
        </ul>
        
        {/* //ITER 3 list countries (no link to details)
          {countries.map((country) => (
            <li key={country.alpha3Code}>{country.name.common}</li>))} */}

    </div>
  )
}

export default HomePage
