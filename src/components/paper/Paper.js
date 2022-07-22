import "./Paper.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import RefreshIcon from '@mui/icons-material/Refresh';

import { Button } from "@mui/material";

import { useState } from "react";

function Paper({ geoData, getWeatherData }) {

  const [lastUpdatedTime, setLastUpdatedTime] = useState(0);

  let pp = 0

  const mainData = geoData.main
  const getTimeIn12Hour = (timestamp) => {
    var time = new Date(timestamp);
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  const getMinutesBetween2Timestamps = (timestamp1, timestamp2) => {
    const diff = Math.abs(timestamp1 - timestamp2);
    return Math.floor(diff / 60000);
  }

  setInterval(function () {
    let lastUpdatedMin = getMinutesBetween2Timestamps(new Date().getTime(), geoData.lastUpdatedTime)
    if (lastUpdatedMin !== lastUpdatedTime) {
      console.log("CHANGE")
      setLastUpdatedTime(lastUpdatedMin)
    }
  }, 1000);


  return (
    <>
      <div className="customPaper">
        <div className="center">
          <div className="flex-item">
            <p className="title">{"Feels Like"}</p>
            <p className="counter">
              {Math.round(mainData.feels_like)}&#176;
            </p>
          </div>
        </div>
        {/* <div className="right">
      <div className="percentage positive">
        <KeyboardArrowUpIcon />
        {"diff"}%
      </div>
      {"data.icon"}
    </div> */}
      </div>

      <div className="customPaper">
        <div className="flex-row">
          <div className="flex-container">
            <div className="flex-item">
              <p className="title">{"Temperature"}</p>
              <p className="counter">
                {Math.round(mainData.temp)}&#176;
              </p>
            </div>

            <div className="flex-item">
              <p className="title">{"Humidity"}</p>
              <p className="counter">
                {mainData.humidity}%
              </p>
            </div>

            <div className="flex-item">
              <p className="title">{"Pressure"}</p>
              <p className="counter">
                {mainData.pressure}in
              </p>
            </div>
            <div className="flex-item">
              <p className="title">{"Visibility"}</p>
              <p className="counter">
                {(geoData.visibility / 1609).toFixed(2)}mi
              </p>
            </div>



          </div>
          <div className="flex-container">
            <div className="flex-item">
              <p className="title">{"Wind"}</p>
              <p className="counter">
                {Math.round(geoData.wind.speed * 2.237)}mph
              </p>
            </div>

            <div className="flex-item">
              <p className="title">{"Sunrise"}</p>
              <p className="counter">
                {getTimeIn12Hour(geoData.sys.sunrise * 1000)}
              </p>
            </div>

            <div className="flex-item">
              <p className="title">{"Sunset"}</p>
              <p className="counter">
                {getTimeIn12Hour(geoData.sys.sunset * 1000)}
              </p>
            </div>


          </div>

        </div>


        {/* <div className="right">
      <div className="percentage positive">
        <KeyboardArrowUpIcon />
        {"diff"}%
      </div>
      {"data.icon"}
    </div> */}
      </div>

      <div className="customPaper">
        <div className="flex-row" style={{ height: "100%" }}>
          <div className="flex-container">
            <div className="flex-item">
              <p className="title">{"Location"}</p>
              <p>
                {geoData.district},
              </p>
              <p>
                {geoData.city}
              </p>
              <p>{geoData.state}</p>
            </div>
            <div className="flex-item">
              <p className="title">{"Last Updated"}</p>
              <p>
                {lastUpdatedTime} min ago
                <br />
                <Button onClick={getWeatherData}><RefreshIcon /></Button>
              </p>
              <p>
              </p>
            </div>

          </div>
        </div>
      </div>



    </>

    // <div className="customPaper">
    //   <div className="left">
    //     <span className="title">{"Fake Title"}</span>
    //     <span className="counter">
    //       {false && "$"} {"5000"}
    //     </span>
    //     <span className="link">{"data.link"}</span>
    //   </div>
    //   <div className="right">
    //     <div className="percentage positive">
    //       <KeyboardArrowUpIcon />
    //       {"diff"}%
    //     </div>
    //     {"data.icon"}
    //   </div>
    // </div>
  );
}

export default Paper;
