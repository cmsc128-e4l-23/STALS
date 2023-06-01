import React from "react";
import {CChart} from "@coreui/react-chartjs";
import Loading from '../../components/Loading';
import "./Analytics.css"

export default function AccommStats(userData, pendAccomm, appAccomm) {
    
    if (userData == null || pendAccomm == null || appAccomm === null) {
        return (
            <Loading />
        )
    }
    else {
        return (
            <div id="polarChart">
                <div className="container">
                        ACCOMMODATION STATISTICS
                </div>
                <CChart
                    type="polarArea"
                    data={{
                        labels: ['Approved', 'Pending'],
                        datasets: [
                            {
                                backgroundColor: ['#41B883', '#E46651'],
                                data: [appAccomm, pendAccomm]
                            },
                        ],
                    }}
                    borderWidth={"1px"}
                />
            </div>
            
        )
    }

};