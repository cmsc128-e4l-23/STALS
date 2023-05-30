import React, { useState, useEffect } from "react";
import './index.css'
import AccommBody from './AccommBody.js'



export default function List({email}){
    const [accomms, setAccomms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'getOwnerAccomms', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
            setAccomms(data.accommodations)
            
        });
        setLoading(false)
    }, [email, loading])


    return(
        <div id="lists">  
        {accomms.length > 0 ?
                <div>
                    <h2>Active Acommodations:</h2>
                    {
                        accomms.map(
                            (accomm) => {
                                return(
                                    <ul>{
                                        (!accomm.archived && accomm.approved) &&
                                        <AccommBody accomm = {accomm} email={email} setLoadin={setLoading}/>
                                        
                                    }   
                                    </ul>
                                )
                                    
                                    
                                
                            }
                        )
                    }
                    <h2>Archived Acommodations:</h2>
                    {
                        accomms.map(
                            (accomm) => {
                            return(
                                <ul>{
                                    (accomm.archived && accomm.approved) &&
                                    <AccommBody accomm = {accomm} email={email} setLoadin={setLoading}/>
                                    
                                }   
                                </ul>
                            )   
                            }
                        )
                    }
                    
                    <h2>Pending Acommodations:</h2>
                    {
                        accomms.map(
                            (accomm) => {
                                
                            return(
                                <ul>{
                                    (accomm.approved === false) &&
                                    <AccommBody accomm = {accomm} email={email} setLoading={setLoading}/>
                                    
                                }   
                                </ul>
                            )   
                            }
                        )
                    }
                </div>
                 : <div>No Accommodations found</div>
            }
        </div>
    )
}