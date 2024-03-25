//src/pages/CountryDetailsPage
//ITER 5
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CountryDetailsPage() {

  const [ country, setCountry ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  
  let { countryId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
    .then(res => {
      setCountry(res.data);
      setLoading(false);
    })
    .catch(error => { console.log(error), setLoading(false)})
  }, [countryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
        <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>Country Details</h1>
        {country ? (

        <div className='detail-container'>

            <div className='detail-content'>
              <img className='content-img' src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} 
                alt="Flag" />
              <h5>{country.name.common}</h5>
            </div> 

            <div className='detail-info'>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area} km²</p>
              <p>Borders:</p>
              <ul>
                {country.borders.map((border) => (
                  <li key={border}>
                    <Link to={`/${border}`}> {border} </Link>
                  </li>
                ))}
              </ul>
          </div>

      </div>
    ) : (
      <div>Country not found.</div>
    )}
      <div>
        <button onClick={() => navigate(-1)}>{'<<'} back</button>
        <button><Link to="/">Home</Link></button>
        <button onClick={() => navigate(1)}>{'>>'} next</button>
      </div>
    </div>
  )
}

export default CountryDetailsPage
