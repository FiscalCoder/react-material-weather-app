import React from "react";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widgets/Widget";
import "./Home.scss";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
      {/* <Sidebar /> */}
      <div className="homeContainer">
        <Navbar />
        <div onClick={getCurrentGeoLocation}>BUTTON</div>
        {geoData.id ? "PRESENT" : "ABSENT"}
        <div>{JSON.stringify(geoData)}</div>
        {geoData.id &&
          <>
            <div className=" widgets">
              <CustomPaper geoData={geoData} getWeatherData={getWeatherData} />
            </div>
            <div className="charts">
              <Featured />
              <Chart />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <List />
            </div>

          </>}
      </div>
    </div>
  );
}

export default Home;
