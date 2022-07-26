import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Home.scss";
import Chart from "../../components/chart/Chart";
import { useEffect, useState } from "react";
import CustomPaper from "../../components/paper/Paper";
function Home() {

  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    getWeatherData();
  }, []);


  const getCurrentGeoLocation = () => {
    return new Promise(async (resolve, reject) => {
      let userGeo = await fetch(`${process.env.REACT_APP_ADDRESS_LOOKUP_URL}/ipgeo?apiKey=${process.env.REACT_APP_ADDRESS_LOOKUP_KEY}`)
      userGeo = await userGeo.json()
      console.log(userGeo)
      resolve(userGeo)
    })
  }

  const getWeatherData = async () => {
    const userGeo = await getCurrentGeoLocation()
    let unparsedData = await fetch(`${process.env.REACT_APP_WEATHER_URL}/weather?lat=${userGeo.latitude}&lon=${userGeo.longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`)
    let parsedData = await unparsedData.json()
    parsedData.district = userGeo.district
    parsedData.city = userGeo.city
    parsedData.state = userGeo.state_prov
    parsedData.lastUpdatedTime = (userGeo.time_zone.current_time_unix * 1000)
    setGeoData(parsedData)
    console.log(parsedData)
  }

  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        {geoData.id &&
          <>
            <div className=" widgets">
              <CustomPaper geoData={geoData} getWeatherData={getWeatherData} />
            </div>
            <div className="charts">
              <Chart />
            </div>

          </>}
      </div>
    </div>
  );
}

export default Home;
