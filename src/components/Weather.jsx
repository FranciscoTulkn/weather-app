import { useEffect } from 'react';
import { BsCloud } from 'react-icons/bs'
import { FaLocationDot, FaWind } from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { fetchForecastByCity } from '../redux/weatherSlice';
import { useSelector } from 'react-redux';

export default function Weather() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchForecastByCity('New York'));
  }, [dispatch]);

  const forecast = useSelector(state => state.weather.forecast);
  console.log(forecast);
  
  const forecastHours = forecast?.forecast?.forecastday[0]?.hour.slice(0, 10);


  return (
    <div className='weather-container'>

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
            return (
                <div className="hour-card" key={index}>
                  <div className="hour-time">
                    <p></p>
                  </div>
                  <div className="hour-condition">
                    <BsCloud />
                  </div>
                  <div className="hour-temp">
                    <h2>10°c</h2>
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
          <input type="text" placeholder='New York' />
        </div>
        <div className="temp-info">
          <h1>10°c</h1>
          <p>
            <FaWind /> NE 40 km/h
          </p>
        </div>

        <div className="forecast-days">
          <h1 className='forecast-heading'>The Next Days Forecast</h1>
          <div className="forecast-item">
            <div className="forecast-details">
              <div className="forecast-icon">
                <BsCloud />
              </div>

              <div className="details">
                <h2>CgMonday, December 16</h2>
                <p>overcast</p>
              </div>
            </div>

            <div className="forecast-temp">
              <div className="temp-display">
                <h2>10°c</h2>
                <h2>5°c</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
