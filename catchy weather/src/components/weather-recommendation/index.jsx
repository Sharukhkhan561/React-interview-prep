import React, { useState } from 'react';
import WeatherCard from '../common/weather-card';
import './index.css';
import { getWeatherData } from '../../API/service';
import { isCityRecommended } from '../../utils/utils';


function WeatherRecommendation({ cities }) {
  const [weatherData, setWeatherData] = useState([]);


  // Fetch weather for all cities and set the state
  const fetchWeatherData = async () => {
    const allWeatherData = [];
    for (let city of cities) {
      const data = await getWeatherData(city);
      allWeatherData.push(data);
    }
    setWeatherData(allWeatherData);
  };


  const recommendCity = () => {
    for (let data of weatherData) {
      if (isCityRecommended(data)) {
        return data?.name;
      }
    }
    return 'No suitable cities for travel at this time.';
  };

  return (
    <div className='main-content'>
      <button onClick={fetchWeatherData}>Fetch Weather</button>
      {weatherData.length > 0 ? (
        <div className='weather-container'>
          <h3>Weather Data for selected cities</h3>
          <div className='list'>
            {weatherData.map((data, index) => (
              <div key={index}>
                <WeatherCard weatherData={data} />
              </div>
            ))}
          </div>

        </div>
      ) : null}

      {weatherData.length > 0 ? (
        <div className='recommended'>
          <h3>Recommended City for Travel:</h3>
          <p>{recommendCity()}</p>
        </div>
      ) : null}
    </div>
  );
}

export default WeatherRecommendation;