import React, { useState, useEffect } from "react";
import AccommList from "./AccommList";
import "./Body.css";
import Loading from '../../components/Loading';


export default function Body({ isLoggedIn, userType, email, data }) {
    const [loading, setLoading] = useState(true);
    const [accommList, updateAccommList] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'searchAccomm', {
            method: 'POST',
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
                setLoading(false)
            })
        
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
                        <AccommList 
                            isLoggedIn={isLoggedIn}
                            userType={userType}
                            email={email}
                            accommList={accommList} 
                        />
                    </div>
                }
                </>
                
                    
            }
        </div>
    )
}