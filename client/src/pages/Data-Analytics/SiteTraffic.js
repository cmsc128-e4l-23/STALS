import { React, useState, useEffect } from "react";
import {CChart} from "@coreui/react-chartjs";
import Loading from '../../components/Loading';
import "./Analytics.css"

export default function SiteTraffic(data) {
    // data -> year: {month: number of visits, ...}

    if (data == null || data['data'] == null) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <div id="site-traffic-graph">
                <h1>SITE TRAFFIC</h1>
            <CChart
                type="line"
                data={{
                    labels: Object.keys(data['data']),
                    datasets: [
                        {
                            label: "Site Visits",
                            backgroundColor: "rgb(65, 184, 131)",
                            borderColor: "rgb(65, 184, 131)",
                            pointBackgroundColor: "rgb(65, 184, 131)",
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