import React, { useState } from 'react';

function CityInput({ addCity }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCity(city);
    setCity('');  // Clear input field after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Add City</button>
    </form>
  );
}

export default CityInput;