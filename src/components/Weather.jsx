import React, { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-bootstrap/FormSelect';



function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherWeek, setWeatherWeek] =useState(null)
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=094427cc31413e501cc01bcb3235d854&units=metric`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log(error);
      });
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=094427cc31413e501cc01bcb3235d854&units=metric`)
      .then(response => {
        setWeatherWeek(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });

  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <h2>WEATHER</h2>
        <label>
          <Select size="sm" value={city} onChange={handleCityChange}>
            <option value="">Select a city</option>
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
            <option value="Минск">Минск</option>
            <option value="Киев">Киев</option>
            <option value="Владивосток">Владивосток</option>
            <option value="Нью-Йорк">Нью-Йорк</option>
            <option value="Лондон">Лондон</option>
            <option value="Каир">Каир</option>
          </Select>
        </label>
        <Button size="sm" type="submit" variant="dark">Get weather</Button>
      </Form>
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
            {weatherWeek && (

        <div>
          <h2>5-day forecast for {weatherWeek.city.name}</h2>
          <div className={"weekWeather"}>
          {weatherWeek.list.map((item, index) => {
            if (index % 8 === 0) {
              return (
                <div className={"blockWeather"} key={item.dt}>
                  <p>Date: {item.dt_txt}</p>
                  <p>Temperature: {item.main.temp} °C</p>
                  <p>Humidity: {item.main.humidity}%</p>
                  <p>Description: {item.weather[0].description}</p>
                </div>
              );
            }
              return null;
          })}
            </div>
        </div>
      )}
    </div>
  );
}

export default Weather;