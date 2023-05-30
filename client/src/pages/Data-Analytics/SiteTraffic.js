import { React, useState, useEffect } from "react";
import {CChart} from "@coreui/react-chartjs";
import Loading from '../../components/Loading';
import "./Analytics.css"

export default function SiteTraffic(data) {
    // data -> year: {month: number of visits, ...}
    
    if (data == null) {
        return (
            <Loading />
        )
    }
    else {
        console.log(data);
        console.log(Object.keys(data['data']));
        console.log(Object.values(data['data']));
        return (
        <div id="site-traffic-graph">
            <CChart
                type="line"
                data={{
                    labels: Object.keys(data['data']),
                    datasets: [
                        {
                            label: "Site Visits",
                            backgroundColor: "rgba(151, 187, 205, 0.2)",
                            borderColor: "rgba(151, 187, 205, 1)",
                            pointBackgroundColor: "rgba(151, 187, 205, 1)",
                            pointBorderColor: "#fff",
                            data: Object.values(data['data'])
                        },
                    ],
                }}
                borderWidth={"1px"}
            />
        </div>
    );
    }
    
}