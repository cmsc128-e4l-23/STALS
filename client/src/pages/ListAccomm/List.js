import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import UnarchiveButton from "./UnarchiveButton";
import './index.css'
import { useNavigate } from "react-router-dom";






export default function List({email}){
    let navigate = useNavigate();
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
                                    
                                        <li>
                                            <div id='li-container' onClick={() => {navigate("/accomm?id=" + accomm._id)}}>
                                                <h3 id='accomm-name'>{accomm.name}</h3>
                                                <ArchiveButton accommodation={accomm} setLoading={setLoading} />
                                                <DeleteButton accommodation={accomm} setLoading={setLoading} />
                                            </div>
                                        </li>
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
                                <li>
                                    <div id='li-container' onClick={() => {navigate("/accomm?id=" + accomm._id)}}>
                                        <h3 id='accomm-name'>{accomm.name}</h3>
                                        <UnarchiveButton accommodation={accomm} setLoading={setLoading} />
                                        <DeleteButton accommodation={accomm} setLoading={setLoading} />
                                    </div>
                                </li>
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
                                accomm.approved === false &&
                                <li>
                                    <div id='li-container' onClick={() => {navigate("/accomm?id=" + accomm._id)}}>
                                        <h3 id='accomm-name'>{accomm.name}</h3>
                                        <DeleteButton accommodation={accomm} setLoading={setLoading} />
                                    </div>
                                </li>
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