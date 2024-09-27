
import './App.css';
import CityInput from './components/common/city-input';
import WeatherRecommendation from './components/weather-recommendation';
import { useState } from 'react';

function App() {
  const [cities, setCities] = useState([]);

  const addCity = (city) => {
    if (city && !cities.includes(city)) {
      setCities([...cities, city]);
    }
  };

  return (
    <div className="App">
      <h1>Weather Travel Recommendation App</h1>
      <CityInput addCity={addCity} />
      <h3>Selected cities</h3>
       {cities?.map((name, idx) => <strong key={name}>{name}{idx !== cities.length-1 ? ', ':''}</strong>)}
       
      <WeatherRecommendation cities={cities} />
    </div>
  );
}

export default App;