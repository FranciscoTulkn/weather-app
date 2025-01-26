import { useEffect } from 'react';
import { BsCloud } from 'react-icons/bs'
import { FaLocationDot, FaWind } from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { fetchForecastByCity } from '../redux/weatherSlice';
import { useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';

import sunnyImage from '../assets/sunny.jpg';
import cloudyImage from '../assets/cloud.jpg';
import rainyImage from '../assets/rain.jpg';
import snowyImage from '../assets/snow.jpg';

export default function Weather() {

  const [city, setCity] = useState('');

  const habdleChange = () => {
    if (city.trim() !== '') {
      dispatch(fetchForecastByCity(city));
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchForecastByCity('New York'));
  }, [dispatch]);

  const forecast = useSelector(state => state.weather.forecast);
  console.log(forecast);
  
  const forecastHours = forecast?.forecast?.forecastday[0]?.hour.slice(0, 10);

  const weatherCondition = forecast?.current?.condition?.text?.toLowerCase();

  let backgroundImage = sunnyImage;

  if (weatherCondition) {
    if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
      backgroundImage = sunnyImage;
    } else if (weatherCondition.includes('rain')) {
      backgroundImage = rainyImage;
    } else if (weatherCondition.includes('snow')) {
      backgroundImage = snowyImage;
    } else if (weatherCondition.includes('cloud') || weatherCondition.includes('overcast')) {
      backgroundImage = cloudyImage;
    }
  }


  return (
    <div className='weather-container'
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}>

      {/* Main ssection */}
      <div className='main-section'>
        <div className="weather-info">
          <div className="location">
            <h3>
              {forecast?.location?.name} - {forecast?.location?.country}
            </h3>
          </div>
          <div className="condition">
            <h1>{forecast?.current?.condition?.text}</h1>
          </div>
        </div>


        <div className="weather-hours">
          {forecastHours?.map((hour, index) => {

            const time = new Date(hour.time).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit', 
              hour12: false,
            });

            return (
                <div className="hour-card" key={index}>
                  <div className="hour-time">
                    <p>{time}</p>
                  </div>
                  <div className="hour-condition">
                    <img src={hour?.condition?.icon} alt=''/>
                  </div>
                  <div className="hour-temp">
                    <h2>{Math.ceil(hour?.temp_c)}°C</h2>
                  </div>
              </div>
            )
          })}

        </div>
      </div>

      {/* Side section */}
      <div className='side-section'>
        <div className="search-box">
          <FaLocationDot />
          <input 
            type="text" 
            placeholder={forecast?.location?.name} 
            value={city} 
            onChange={(e) => setCity(e.target.value)}           
          />
          <BiSearch className='icon' onClick={habdleChange} />
        </div>


        <div className="temp-info">
          <h1>{Math.ceil(forecast?.current?.temp_c)}°c</h1>
          <p>
            <FaWind /> {forecast?.current?.wind_dir} {" "}  {forecast?.current?.wind_kph}  km/h
          </p>
        </div>

        <div className="forecast-days">
          <h1 className='forecast-heading'>The Next Days Forecast</h1>
          {forecast?.forecast?.forecastday?.map((item, index) => {

            const date = new Date(item.date).toLocaleDateString('en-US', {
              weekday: 'long',
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })

            return (
              <div className="forecast-item" key={index}>
            <div className="forecast-details">
              <div className="forecast-icon">
                <img src={item.day.condition.icon} alt=''/>
              </div>

              <div className="details">
                <h2>{date}</h2>
                <p>{item.day.condition.text}</p>
              </div>
            </div>

            <div className="forecast-temp">
              <div className="temp-display">
                <h2>{Math.ceil(item.day.maxtemp_c)}°c</h2>
                <h2>{Math.ceil(item.day.mintemp_c)}°c</h2>
              </div>
            </div>
          </div>
            )
          })}
          
        </div>
      </div>
    </div>
  )
}
