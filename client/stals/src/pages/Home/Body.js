import { React, useState, useEffect, useCallback } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AccommList from "./AccommList";
import "./Body.css";
import Loading from "components/Loading";


export default function Body({ isLoggedIn, email, data }) {
    const [loading, setLoading] = useState(true);
    const [accommList, updateAccommList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/searchAccomm', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ searchString: data }),
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    updateAccommList(data.result);
                }else throw Error
            })
        setLoading(false)
    }, [data])

    return(
        <div className="body-div">
            {
                loading ? 
                <Loading />
                :
                <>
                {
                    accommList.length === 0 ?
                    <h3 id="not-found">Accommodations not found</h3>
                    :
                    <div className="body-container">
                        <h1>Accommodations: </h1>
                        <AccommList 
                            isLoggedIn={isLoggedIn}
                            email={email}
                            accommList={accommList} 
                        />
                    </div>
                }
                </>
                
                    
            }
        </div>
    )

    // // loading
    // if (fetchedAccomm == null) {
    //     return (
    //         <div className="body-div">
    //             <Box alignItems={"center"}>
    //                 <CircularProgress />
    //             </Box>
    //         </div>
    //     );
    // }
    // // not searching anything
    // // Homepage
    // if (data === "") {
    //     return (
    //         // the whole body
    //         <div className="body-div">
    //             <div className="body-container">
    //                 <h1>Within UPLB Vicinity</h1>
    //                 <div id="inside" className="body-group">
    //                     {accommList.map((accomm) => {
    //                         if (accomm.generalLocation <= 1000) {
    //                             return < AccommCard data={passData} accomm={accomm} />
    //                         }
    //                     })}
    //                 </div>
    //                 <h1>Outside UPLB Vicinity</h1>
    //                 <div id="inside" className="body-group">
    //                     {accommList.map((accomm) => {
    //                         if (accomm.generalLocation > 1000) {
    //                             return < AccommCard data={passData} accomm={accomm}  />
    //                         }
    //                     })}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    // // return search results
    // else {
    //     // display results accordingly
    //     // AccommCard not found
    //     if (fetchedAccomm == false) {
    //         return (
    //             <div className="body-div">
    //                 <h3 id="not-found">AccommCard not found</h3>
    //             </div>
    //         );
    //     }
    //     else {
    //         // AccommCard found
    //         return (
    //             // the whole body
    //             <div className="body-div">
    //                 <div className="body-container">
    //                     <div className="body-group">
    //                         {accommList.map((accomm) => {
    //                             return < AccommCard data={passData} accomm={accomm} />
    //                         })}
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     }
    // }
}