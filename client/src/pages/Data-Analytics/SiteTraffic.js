import { React, useState, useEffect } from "react";
import {CChart} from "@coreui/react-chartjs";
import Loading from '../../components/Loading';
import "./Analytics.css"

export default function SiteTraffic() {
    // data -> year: {month: number of visits, ...}
    // an array of the num of visits per month
    const [numOfVisits, setNumOfVisits] = useState([]); 
    const [dataType, setDataType] = useState('YEAR');
    const [labels, setLabels] = useState([])
    const [data, setData] = useState(null);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const monthName = today.toLocaleString('default', { month: 'long' });

    const updateData = (retVal) => {
        let sums = [];
        let keys = [];
        let sum = 0;

        for (let key in retVal) {
            for (let elem in retVal[key]) {
                sum += retVal[key][elem];
            }
            keys.push(key);
            sums.push(sum);
            sum = 0; // reset
        }
        setLabels(keys);
        setNumOfVisits(sums);
    }
    

    useEffect(() => {
        fetch('http://localhost:3001/getVisits', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                year: year,
                month: month+1,
                day: day
            }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    setData(body.return[year]);
                    updateData(body.return[year]);
                }
        })
    }, [])

    const changeData = () => {
        if (dataType == 'YEAR') {
            setNumOfVisits(data[monthName]); // change to per month
            setLabels(Object.keys(data[monthName]));
            setDataType('MONTH');

        } else if (dataType == 'MONTH') {
            updateData(data);
            setDataType('YEAR');
        }
    }

    if (data == null) {
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
                    labels: labels,
                    datasets: [
                        {
                            label: "Site Visits",
                            backgroundColor: "rgb(65, 184, 131)",
                            borderColor: "rgb(65, 184, 131)",
                            pointBackgroundColor: "rgb(65, 184, 131)",
                            pointBorderColor: "#fff",
                            data: numOfVisits
                        },
                    ],
                }}
                borderWidth={"1px"}
                />
                <button onClick={changeData}>VISITS OF THE {dataType}</button>
        </div>
    );
    }
    
}