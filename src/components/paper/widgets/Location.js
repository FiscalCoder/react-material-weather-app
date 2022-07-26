import { useState } from "react";
import { Button } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';


function Paper({ geoData, getWeatherData }) {

    const [lastUpdatedTime, setLastUpdatedTime] = useState(0);


    const getMinutesBetween2Timestamps = (timestamp1, timestamp2) => {
        const diff = Math.abs(timestamp1 - timestamp2);
        return Math.floor(diff / 60000);
    }

    setInterval(() => {
        let lastUpdatedMin = getMinutesBetween2Timestamps(new Date().getTime(), geoData.lastUpdatedTime)
        console.log(lastUpdatedMin, lastUpdatedTime, geoData.lastUpdatedTime)
        if (lastUpdatedMin !== lastUpdatedTime) {
            console.log("CHANGE")
            setLastUpdatedTime(lastUpdatedMin)
        }
    }, 5000);


    return (
        <>
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
                            <Button onClick={() => {
                                setLastUpdatedTime(0);
                                getWeatherData();
                            }}><RefreshIcon /></Button>
                        </p>
                        <p>
                        </p>
                    </div>

                </div>
            </div>

        </>
    );
}

export default Paper;
